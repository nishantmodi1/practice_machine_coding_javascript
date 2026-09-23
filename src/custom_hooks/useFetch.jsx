import { useState, useEffect, useCallback, useRef } from 'react'

// using Ref 
export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Use ref to track mounted state (simpler than abort controller)
  const mountedRef = useRef(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      
      const result = await response.json()
      
      // Only update if component is still mounted
      if (mountedRef.current) {
        setData(result)
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err.message)
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false)
      }
    }
  }, [url])

  useEffect(() => {
    mountedRef.current = true
    fetchData()
    
    return () => {
      mountedRef.current = false // Cleanup on unmount
    }
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}

// // using Abort controller
// import { useState, useEffect, useCallback } from 'react'

// export const useFetch = (url) => {
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const fetchData = useCallback(async (signal) => {
//     setLoading(true)
//     setError(null)
    
//     try {
//       const response = await fetch(url, { signal })
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const result = await response.json()
      
//       // Only update state if not aborted
//       if (!signal.aborted) {
//         setData(result)
//       }
//     } catch (err) {
//       // Don't set error if aborted (it's expected)
//       if (err.name !== 'AbortError' && !signal.aborted) {
//         setError(err.message || 'Failed to fetch')
//       }
//     } finally {
//       if (!signal.aborted) {
//         setLoading(false)
//       }
//     }
//   }, [url])

//   useEffect(() => {
//     // Create abort controller for this fetch
//     const controller = new AbortController()
//     const signal = controller.signal
    
//     fetchData(signal)
    
//     // Cleanup: abort if component unmounts or URL changes
//     return () => {
//       controller.abort()
//     }
//   }, [fetchData])

//   // Refetch function (creates new abort controller)
//   const refetch = useCallback(async () => {
//     const controller = new AbortController()
//     const signal = controller.signal
    
//     try {
//       await fetchData(signal)
//     } catch (err) {
//       // Handle error if needed
//     }
    
//     return () => controller.abort() // Optional: return cleanup
//   }, [fetchData])

//   return { data, loading, error, refetch }
// }

// // basic
// import { useState, useEffect, useCallback } from 'react'

// export const useFetch = (url) => {
//   const [data, setData] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const fetchData = useCallback(async () => {
//     setLoading(true)
//     setError(null)
    
//     try {
//       const response = await fetch(url)
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       const result = await response.json()
//       setData(result)
//     } catch (err) {
//       setError(err.message || 'Something went wrong')
//     } finally {
//       setLoading(false)
//     }
//   }, [url]) // Recreate when URL changes

//   // Auto-fetch when URL changes
//   useEffect(() => {
//     fetchData()
//   }, [fetchData])

//   return { data, loading, error, refetch: fetchData }
// }