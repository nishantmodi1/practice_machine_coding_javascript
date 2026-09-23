import React, { useReducer } from 'react'
import { AdvanceCounterReducer, DECREMENT, DECREMENT_BY, INCREMENT, INCREMENT_BY, initialState, RESET } from './AdvanceCounterReducer'

const AdvanceCounterUsingUseReducer = () => {
  const [state, dispatch] = useReducer(AdvanceCounterReducer, initialState)
  console.log(state)
  return (
    <div style={{ margin: "0 auto", textAlign: 'center', marginTop: '5%'}}>
      <h1>Advance Counter using useReducer</h1>
      <p>{state.count}</p>
      <div style={{ display:'flex', flexDirection:'column'}}>
        <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
        <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
        <button onClick={() => dispatch({ type: RESET})}>Reset</button>
        <button onClick={() => dispatch({ type: INCREMENT_BY, payload: 5 })}>Increament by 5</button>
        <button onClick={() => dispatch({ type: DECREMENT_BY, payload: 5 })}>Decrement by 5</button>
      </div>
      <div>
        <h1>Total changes made by counter changes: {state.totalChanges}</h1>
        <p>History: {state.history.length}</p>
        <ul>
        {state.history.map((data, index) => 
          <ol key={index}>{data.type}: {data.value}</ol>
        )}
          </ul>
      </div>
    </div>
  )
}

export default AdvanceCounterUsingUseReducer
