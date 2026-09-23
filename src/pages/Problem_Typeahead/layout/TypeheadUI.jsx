import React, { useState } from 'react'

const TypeheadUI = ({ onChange, query, data, handleKeyDown, selectedIndex }) => {
  

  return (
    <div>
      <div>
        Type here to get list below:
        <input 
          value={query}
          onKeyDown={handleKeyDown}
          onChange={(e) => onChange(e)}
          style={{border: '1px solid black', padding:'5px 8px'}}
        />
      </div>
      {data?.length>0 && <div style={{border:'2px solid black', height:'40vh', overflow:'auto', width:'400px', marginLeft:'120px'}}>
        <ul>
        {data.map((d, i) => (
          <li style={{backgroundColor: selectedIndex===i?"red":"transparent"}}>{d.title}</li>
        ))}
        </ul> 
      </div>}
    </div>
  )
}

export default TypeheadUI
