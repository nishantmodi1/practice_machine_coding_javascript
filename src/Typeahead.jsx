// Build the Typeahead search. Start with:
// 1. Input field
// 2. Fetch on type (no debounce yet)
// 3. Show results
// 4. Loading state

import { useEffect, useState } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value)
    searchUsers(value)
  }

  const searchUsers = async (query) => {
    if(!query){
      setResults([])
      return
    }
    setLoading(true)
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?q=${query}`
      );
      if(!res.ok) throw new Error("error fetching response")
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error('fetching error', error)
    }finally{
      setLoading(false)
    }
  };

  console.log(results)

  return (
    <div style={{ display: 'flex', flexDirection:'column', justifyContent: 'center', marginTop: '5%' }}>
      <input placeholder="type here..." value={query} onChange={handleChange} />
      {loading && <div>Loading...</div>}
      <div >
      {results?.length> 0 && results.map((item) => (
          <li key={item?.id}>{item?.name}</li>
      ))}
      </div>
    </div>
  );
}

export default SearchComponent;
