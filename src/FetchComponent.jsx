import React from 'react'
import { useFetch } from './custom_hooks/useFetch'

const FetchComponent = () => {
  const {data, loading, error, refetch} = useFetch( `https://jsonplaceholder.typicode.com/users/${userId}`)

  if(loading) return <div>Loading...</div>
  if(error) return <div>Error...</div>

  return (
    <div>
      <h2>{data.name}</h2>    
      <p>email: {data.email}</p>    
      <button onClick={refetch}>Refetch</button>
    </div>
  )
}

export default FetchComponent
