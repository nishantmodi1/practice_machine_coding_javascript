import React from 'react'

const TableJson = () => {
  const headRow = ["Name", "Gender", "Role"]
  const data = [
    {
      sl: 1,
      name: "John",
      gender: "M",
      role: "Admin"
    },
    {
      sl: 2,
      name: "Alice",
      gender: "F",
      role: "Admin"
    },
    {
      sl: 3,
      name: "Prince",
      gender: "M",
      role: "User"
    }
  ]

  return (
    <div>
      <div style={{display: 'flex', gap:'20px'}}>
        {headRow.map((val, index) => <h1>{val}</h1>)}
      </div>
      {data.map((val, index) => {
        console.log("val>>>", val)
        return(
          <ul style={{display: 'flex', gap:'20px'}}>
            <ol>{val.sl}</ol>
            <ol>{val.name}</ol>
            <ol>{val.gender}</ol>
            <ol>{val.role}</ol>
          </ul>
        )
      })}
    </div>
  )
}

export default TableJson
