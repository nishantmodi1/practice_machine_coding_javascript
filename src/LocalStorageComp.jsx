import React, { useState } from 'react'
import { useLocalStorage } from './custom_hooks/useLocalStorage'

const LocalStorageComp = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [notifications, setNotifications] = useLocalStorage('notifications', true)

  return (
    <div>
      <p>Theme: {theme}</p>    
      <select value={theme} name="" id="" onChange={(e) => setTheme(e.target.value)}>
        <option value='light'>Light</option>
        <option value='dark'>Dark</option>
      </select>

      <p>Notifications: {notifications?'On':'Off'}</p>
      <button onClick={() => setNotifications(!notifications)}>Toggle Notification</button>

      <button onClick={() => {setTheme('light'); setNotifications(true)}}>Reset to default</button>
    </div>
  )
}

export default LocalStorageComp
