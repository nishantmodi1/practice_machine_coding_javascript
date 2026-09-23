import React, { useState } from 'react'
import { usePrevious } from './custom_hooks/usePrevious';
import { useToggle } from './custom_hooks/useToggle';

const ToggleComponent = () => {
  const [isOn, toggle, setIsOn] = useToggle(false);
  
  return (
    <div>
      <p>Light: {isOn ? 'ON' : 'OFF'}</p>
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => toggle(true)}>Turn On</button>
      <button onClick={() => setIsOn(false)}>Turn Off</button>
    </div>
  )
}

export default ToggleComponent

// const PreviousComponent = () => {
//   const [count, setCount] = useState(0);
//   const prevCount = usePrevious(count)
//   return (
//     <div>
//       <p>Current: {count}</p>
//       <p>Previous: {prevCount}</p>
//       <button onClick={() => setCount(c => c + 1)}>Increment</button>
//     </div>
//   )
// }

// export default PreviousComponent
