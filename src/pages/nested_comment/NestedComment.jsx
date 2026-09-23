import React from 'react'
import CommentBox from './CommentBox'

const NestedComment = () => {
  const data = [
    {
      name: "Nishant",
      comment: "lorem imsum",
      replies: [
        {
          name: "Alice",
          comment: "lorem imsum oiafsdl fdpoiak",
          replies: []
        },
      ]
    },
    {
      name: "Alice",
      comment: "lorem imsum oiafsdl fdpoiak",
      replies: [
        {
          name: "Bob",
          comment: "lorem imsummfda fdjas fdaoija fdsj",
          replies: []
        }
      ]
    },
    {
      name: "Bob",
      comment: "lorem imsummfda fdjas fdaoija fdsj",
      replies: [
        {
          name: "Nishant",
          comment: "lorem imsum",
          replies: [
            {
              name: "Alice",
              comment: "lorem imsum oiafsdl fdpoiak",
              replies: []
            },
          ]
        },
      ]
    }
  ]
  return (
    <div>
      <CommentBox data={data} />
    </div>
  )
}

export default NestedComment
