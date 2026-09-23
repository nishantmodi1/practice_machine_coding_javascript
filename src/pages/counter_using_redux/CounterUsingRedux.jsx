import React from 'react'
import {increment, decrement, reset, incrementBy, decrementBy } from './useReducerCounter'
import { useDispatch, useSelector } from 'react-redux';

const CounterUsingRedux = () => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state?.counter?.count)
  
  return (
    <div style={{ display: 'flex', gap:'20px', flexDirection:'column', margin: "0 auto"}}>
      <div style={{textAlign: 'center'}}>Counter with Redux</div>
      <p style={{textAlign: 'center'}}>{count}</p>
      <button onClick={() => {dispatch(increment()); console.log("count: ", count)}}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
      <button onClick={() => dispatch(reset())}>reset</button>
      <button onClick={() => dispatch(incrementBy(5))}>increment By 5</button>
      <button onClick={() => dispatch(decrementBy(5))}>decrement By 5</button>
    </div>
  )
}

export default CounterUsingRedux
