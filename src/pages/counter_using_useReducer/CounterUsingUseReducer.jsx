import React, { useReducer } from 'react'
import { counterReducer, INCREMENT, InitialValue } from './counterReducer'

const CounterUsingUseReducer = () => {
  const [state, dispatch] = useReducer(counterReducer, InitialValue)

  return (
    <div style={{ display: 'flex', justifyContent:'center', flexDirection: 'column', margin: "0 auto", marginTop:'5%'}}>
      <h1 style={{textAlign: 'center'}}>Counter with useReducer</h1>

      <h1 style={{textAlign: 'center'}}>{state?.count}</h1>

      <button onClick={() => {dispatch({type: 'INCREMENT'}); console.log(state)}}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT'})}>Decrement</button>
      <button onClick={() => dispatch({ type: 'RESET'})}>Reset</button>
    </div>
  )
}

export default CounterUsingUseReducer
