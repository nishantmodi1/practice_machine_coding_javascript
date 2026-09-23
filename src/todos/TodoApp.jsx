import React, { useReducer, useState } from 'react'

const reducer = (state, action) => {
  if(action.type === "ADD"){
    state+=1
  }else if(action.type === "DELETE"){

  }else if(action.type === "TOGGLE"){

  }
  // switch(){
  //   case 
  // }
}

const TodoApp = () => {
  const [query, setQuery] = useState('')
  const [todos, setTodos] = useState(['sleep', 'work'])
  const [editIndex, setEditIndex] = useState(null)
  const initialState = []
  const [state, dispatch] = useReducer(reducer, initialState);

  // const []
  const handleAddTodo = () => {
    if(query.trim() === '') return
    console.log('add is clicked')
    if(editIndex !== null){
      // update existing todos
      setTodos((prev) => prev.map((todo, index) => index === editIndex ? query.trim():todo))
      setEditIndex(null)
    }else{
      setTodos(prev => [
        ...prev, query.trim()
      ])
    }
    setQuery('')
  }

  const handleDelete = (indexToDelete) => {
    setTodos(prev => (
      prev.filter((_, index) => index !== indexToDelete)
    ))
  }

  const handleEdit = (indexToEdit) => {
    setQuery(todos[indexToEdit])
    setEditIndex(indexToEdit)
  }

  return (
    <div  style={{ display:'flex', flexDirection:'column', justifyContent:'center', marginLeft: '40%', marginTop:'5%',  }}>
      <div sx={{paddingBottom:'20px', }}>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='add todos...'
      />
      <button onClick={() => handleAddTodo()}>Add</button>
      </div>
      {todos.map((todo, index) => {
        return(
          <div key={index} style={{display:'flex', flexDirection: 'column'}}>
            <li>{todo} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={() => handleDelete(index)}>Delete</button>&nbsp;&nbsp;<button onClick={() => handleEdit(index)}>Edit</button></li>
            
          </div>
        )
      })}
    </div>
  )
}

export default TodoApp


// Requirements:
// 1. Add todo
// 2. Toggle complete
// 3. Delete todo
// 4. Undo (Ctrl+Z)
// 5. Redo (Ctrl+Y)
// 6. Show history stack

// function TodoApp() {
  // State structure:
  // {
  //   present: { todos: [] },
  //   past: [],
  //   future: []
  // }
  
  // Your turn!
  // Hint: useReducer might be cleaner than useState here
// }

// Bonus: Save to localStorage and restore on refresh