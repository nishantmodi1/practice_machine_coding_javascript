import React from 'react'

const VirtualScroll = ({items, itemHeight, containerHeight}) => {
  
  return (
    <div style={{  width:'60%', height:`${containerHeight}px`, border:'1px solid black', overflowY: 'auto'}}>
      {items.map((item) => {
        return(
          <div style={{ width: '100%', height: `${containerHeight/6}px`, margin: '10px auto', backgroundColor: 'gray'}}>
            {item.name}
          </div>
        )
      })}
    </div>
  )
}

export default VirtualScroll
