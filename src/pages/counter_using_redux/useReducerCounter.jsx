import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  // name
  name: "counter",

  // initialState
  initialState: {
    count:0
  },

  // reducers
  reducers:{
    increment: (state) => {
      state.count+=1
    },
    decrement: (state) => {
      state.count-=1
    },
    reset: (state) => {
      state.count = 0
    },
    incrementBy: (state, action) => {
      state.count+=action.payload
    },
    decrementBy: (state, action) => {
      state.count-=action.payload
    }
  }
})

export const { increment, decrement, reset, incrementBy, decrementBy } = counterSlice.actions

export default counterSlice.reducer



































// // CounterSlice.js (Redux/Toolkit)
// import { createSlice } from '@reduxjs/toolkit'

// const counterSlice = createSlice({
//   // signature/name
//   name: "counter",

//   // initial value
//   initialState: {
//     count: 0,
//     // history: [],
//     // totalChanges: 0,
//   },

//   // reducer
//   reducers: {
//     increment: (state) => {
//       state.count+=1
//     },
//     decrement: (state) => {
//       state.count-=1
//     },
//     reset: (state) => {
//       state.count = 0
//     },
//     // incrementBy: {
//     //   // state
//     // },
//     // decrementBy: {},
//   }
// })

// export const { increment, decrement, reset } = counterSlice.actions

// export default counterSlice.reducer