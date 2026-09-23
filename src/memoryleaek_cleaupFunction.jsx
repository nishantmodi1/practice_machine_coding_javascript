import { use, useEffect } from "react"

// 
useEffect(() => {
  const id=setInterval(() => {

  }, 1000)
  clearInterval(id)
})

useEffect(() => {
  window.addEventListener('click', () => {

  })
  window.removeEventListener('click', () => {

  })

})

useEffect(() => {
  const socket = new WebSocket('ws://localhost:8000')
  return () => socket.close()
}, [])

useEffect(() => {
  const controller = new AbortController()
  fetch('https://jsonplaceholder.typicode.com/todos/1', {
    signal: controller.signal
  })
  return () => controller.abort()
}, [])

useEffect(() => {
  fetch('/api/user').then(res => res.json()).then(setUsers)
})
