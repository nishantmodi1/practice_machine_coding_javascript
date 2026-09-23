import { useEffect, useState } from "react";

const useSearchUsers = (query) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setData([]);
      setError(null);
      return;
    }

    let isMounted = true; // 🔹 lifecycle guard
    const controller = new AbortController()

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users?q=${query}`, {signal: controller.signal}
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const results = await res.json();

        // 🔹 Only update state if component still alive
        if (isMounted) {
          setData(results);
        }
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          setError(err.message);
        }

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const timerId = setTimeout(() => {
      fetchUsers();
    }, 300)

    // 🔹 cleanup when query changes or component unmounts
    return () => {
      isMounted = false;
      controller.abort()
      clearTimeout(timerId)
    };
  }, [query]);

  return { data, loading, error };
};

function SearchComponent() {
  const [query, setQuery] = useState("");
  const { data, loading, error } = useSearchUsers(query);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleKeyDown = (e) => {
    console.log('selectedIndex', selectedIndex)
    if(e.key === "ArrowDown") {
      setSelectedIndex((prev) => prev < data.length-1 ? prev + 1 : prev)
    }else if(e.key === "ArrowUp") {
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
    }else if(e.key === "Enter") {
        if (selectedIndex >= 0 && data[selectedIndex]) {
          setQuery(data[selectedIndex]?.name)
        }
    }
  }

  useEffect(() => {
    console.log(data.length, selectedIndex)
  }, [selectedIndex])

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5%" }}>
      <input
        placeholder="type here..."
        value={query}
        onKeyDown={handleKeyDown}
        onChange={(e) => {setQuery(e.target.value); setSelectedIndex(-1)}}
      />

      {loading && <div>🔍 Searching...</div>}
      {error && <div>❌ {error}</div>}

      {data.map((user, index) => (
        <li key={user.id} style={{backgroundColor: selectedIndex===index ? 'lightgreen' : "#fff"}}>{user.name}</li>
      ))}
    </div>
  );
}

export default SearchComponent;












// // Build the Typeahead search. Start with:
// // 1. Input field
// // 2. Fetch on type (no debounce yet)
// // 3. Show results
// // 4. Loading state

// import { useEffect, useState } from "react";

// // Use this API:
// const useSearchUsers = (query) => {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState(null)

//   useEffect(() => {
//     if(!query){
//       setData([])
//       return
//     }
//     // let mounted = true;  here ismount is not working so we are going to work on controller
//     const controller = new AbortController()

    
//     const handleFetchData = async() => {
//       setLoading(true)
//       try {
//         const res = await fetch(
//           `https://jsonplaceholder.typicode.com/users?q=${query}`, {signal: controller.signal}
//         )
        
//         if(!res.ok) throw new Error("fetching Error")
          
//           const results = await res.json() 
//           console.log('dafdsf', results)
//         // if(mounted) {setData(results); setError(null)}
//         setData(results)
//       } catch (err) {
//       //  console.error('Error fetching') 
//       //  if(mounted) setErrors(error?.message)
//       if (err.name !== "AbortError") {
//           setErrors(err.message);
//         }
//       }finally{
//         // if(mounted) setLoading(false)
//         setLoading(false)
//       }
//     }
//     handleFetchData()

//     // return () => {
//     //   mounted = false
//     // }
//     return () => controller.abort()
//   }, [query])
//   console.log(data)
//   return {data, loading, errors}
// };

// function SearchComponent() {
//     const [query, setQuery] = useState('')
//     const {data, loading, errors} = useSearchUsers(query)
//     console.log(data)

//     const handleChange = (e) => {
//       const value = e.target.value;
//       setQuery(value)
//     }
    
//     return (
//         <div style={{display: 'flex', justifyContent: 'center', marginTop: '5%'}}>
//             <input
//               placeholder="type here..."
//               value = {query}
//               onChange={handleChange}
//             />
//             {loading && <div>🔍 Searching...</div>}
//             {errors && <div>❌ {errors}</div>}
//             {data?.length>0 && data.map((item) => (
//               <li key={item.id}>{item.name}</li>
//             ))}
//         </div>
//     );
// }

// export default SearchComponent