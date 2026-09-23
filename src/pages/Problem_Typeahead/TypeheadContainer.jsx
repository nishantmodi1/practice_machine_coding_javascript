import React, { useCallback, useEffect, useState } from 'react'
import TypeheadUI from './layout/TypeheadUI'

const TypeheadContainer = () => {
  const Search_url = `https://jsonplaceholder.typicode.com/posts`
  const [data, setData] = useState()
  const [query , setQuery] = useState();
  const [selectedIndex, setSelectedIndex] = useState(-1)
  

  const handleFetch = async(query) => {
    try {
      const res = await fetch(`${Search_url}?q=${query}`)
      console.log(res)
      if(!res.ok){
        throw new Error("Failed to fetch posts")
      }
      const result = await res.json()
      setData(result)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setSelectedIndex(-1)
    let timerId = setTimeout(() => {
      handleFetch(query)
    }, 300);

    return () => {
      clearTimeout(timerId)
    }
  }, [query])

  const handleChange = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  const handleKeyDown = (e) => {
    console.log("selectedIndex>>>", selectedIndex)
    if(e.key === "ArrowDown"){
      setSelectedIndex(prev => prev < data.length - 1 ? prev+1 : prev)
    }else if(e.key === "ArrowUp"){
      setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
    }else if(e.key === "Enter"){
      if(selectedIndex>=0 && data[selectedIndex]){
        setQuery(data[selectedIndex].title)
      }
    }
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div>
      <TypeheadUI onChange={handleChange} query={query} data={data} handleKeyDown={handleKeyDown} selectedIndex={selectedIndex} />
    </div>
  )
}

export default TypeheadContainer
