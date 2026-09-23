import React from 'react'

const CommentBox = ({ data }) => {
  return (
    <div style={{display:'flex', flexDirection: 'column', gap:'12px', }}>
      {data.map((val, index) => {
        console.log("val>>>", val)
        return(<div style={{}}>
          <div key={index} style={{ }}>
            <div>{val?.name}</div>
            <div>{val?.comment}</div>
          </div>
          {val.replies.length>0 && <div style={{marginLeft: "20px"}}>
            Replies: <CommentBox data={val.replies} />
          </div>}
        </div>)
      })}
    </div>
  )
}

export default CommentBox
