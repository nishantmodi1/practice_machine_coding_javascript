import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { Provider } from 'react-redux'
import counterReducer from './useReducerCounter'
import CounterUsingRedux from './CounterUsingRedux'

export const store = configureStore({
  reducer:{
    counter: counterReducer
  }
})

const MainReduxCounter = () => {
  return (
    <Provider store={store}>
      <CounterUsingRedux />
    </Provider>
  )
}

export default MainReduxCounter












































// import React from 'react'
// import { Provider } from 'react-redux'
// import CounterUsingRedux from './CounterUsingRedux'
// import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from './useReducerCounter'

// const store = configureStore({
//   reducer: {
//     counter: counterReducer
//   }
// })

// const MainReduxCounter = () => {
//   return (
//     <Provider store={store}>
//       <div>
//         <CounterUsingRedux />
//       </div>
//     </Provider>
//   )
// }

// export default MainReduxCounter
