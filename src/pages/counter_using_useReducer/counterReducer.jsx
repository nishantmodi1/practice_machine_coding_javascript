export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const RESET = "RESET"

export const InitialValue = {
  count: 0
}

export const counterReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT: 
      return { ...state, count: state.count + 1}

    case DECREMENT: 
      return { ...state, count: state.count - 1}

    case RESET: 
      return { ...state, count: 0}
  }
}