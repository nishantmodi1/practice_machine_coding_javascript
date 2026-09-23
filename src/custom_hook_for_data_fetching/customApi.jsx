import React, { useState, useEffect, useCallback, useRef } from 'react';

// Simple in-memory cache for demonstration
const apiCache = new Map();

// Request deduplication - track ongoing requests
const ongoingRequests = new Map();

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Use ref to track if component is mounted to prevent state updates on unmounted components
  const isMounted = useRef(true);
  const abortController = useRef(null);
  
  // Generate cache key based on URL and relevant options
  const getCacheKey = useCallback(() => {
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${method}:${url}:${body}`;
  }, [url, options]);

  const fetchData = useCallback(async (skipCache = false) => {
    if (!url) return;

    const cacheKey = getCacheKey();
    
    // Check cache first (unless explicitly skipping cache for refetch)
    if (!skipCache && apiCache.has(cacheKey)) {
      const cachedData = apiCache.get(cacheKey);
      if (isMounted.current) {
        setData(cachedData);
        setLoading(false);
        setError(null);
      }
      return;
    }

    // Request deduplication - if same request is already in progress, wait for it
    if (ongoingRequests.has(cacheKey)) {
      try {
        const result = await ongoingRequests.get(cacheKey);
        if (isMounted.current) {
          setData(result);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        if (isMounted.current) {
          setError(err.message);
          setLoading(false);
        }
      }
      return;
    }

    // Cancel previous request if any
    if (abortController.current) {
      abortController.current.abort();
    }

    // Create new abort controller for this request
    abortController.current = new AbortController();
    
    if (isMounted.current) {
      setLoading(true);
      setError(null);
    }

    try {
      // Create the fetch promise
      const fetchPromise = fetch(url, {
        ...options,
        signal: abortController.current.signal
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      });

      // Add to ongoing requests for deduplication
      ongoingRequests.set(cacheKey, fetchPromise);

      const result = await fetchPromise;
      
      // Cache successful result
      apiCache.set(cacheKey, result);
      
      if (isMounted.current) {
        setData(result);
        setLoading(false);
      }

    } catch (err) {
      // Don't set error for aborted requests
      if (err.name === 'AbortError') {
        return;
      }
      
      if (isMounted.current) {
        setError(err.message);
        setLoading(false);
      }
    } finally {
      // Clean up ongoing request tracking
      ongoingRequests.delete(cacheKey);
    }
  }, [url, options, getCacheKey]);

  // Refetch function that bypasses cache
  const refetch = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Effect to trigger fetch when URL or options change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  return { data, loading, error, refetch };
};

// Demo Component to showcase the hook
const ApiDemo = () => {
  const [endpoint, setEndpoint] = useState('https://jsonplaceholder.typicode.com/posts/1');
  
  const { data, loading, error, refetch } = useApi(endpoint);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Custom useApi Hook Demo</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">API Endpoint:</label>
        <select 
          value={endpoint} 
          onChange={(e) => setEndpoint(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="https://jsonplaceholder.typicode.com/posts/1">Post 1</option>
          <option value="https://jsonplaceholder.typicode.com/posts/2">Post 2</option>
          <option value="https://jsonplaceholder.typicode.com/users/1">User 1</option>
          <option value="https://httpstat.us/500">Error Demo (500)</option>
        </select>
      </div>

      <div className="mb-4">
        <button 
          onClick={refetch}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refetch Data'}
        </button>
      </div>

      {loading && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded mb-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            Loading...
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded mb-4">
          <h3 className="font-medium text-red-800">Error:</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {data && !loading && (
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="font-medium text-green-800 mb-2">Success! Data received:</h3>
          <pre className="bg-white p-3 rounded border overflow-auto max-h-64 text-sm">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="font-medium mb-2">Hook Features Demonstrated:</h3>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>• Loading states with visual indicators</li>
          <li>• Error handling for failed requests</li>
          <li>• Manual refetch functionality</li>
          <li>• Request cancellation (switch endpoints quickly to see)</li>
          <li>• Caching (switch back to previous endpoints for instant load)</li>
          <li>• Request deduplication (prevents duplicate concurrent requests)</li>
        </ul>
      </div>
    </div>
  );
};

export default ApiDemo;
