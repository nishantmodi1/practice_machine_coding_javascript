export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const RESET = "RESET"
export const INCREMENT_BY = "INCREMENT_BY"
export const DECREMENT_BY = "DECREMENT_BY"

export const initialState = {
  count : 0,
  history: [],
  totalChanges: 0,
}

export const AdvanceCounterReducer = (state, action) => {
  switch(action.type){
    case INCREMENT:
      return { 
        ...state, 
        count: state.count + 1,
        history: [ ...state.history, { type: "INCREMENT", value: state.count + 1 }],
        totalChanges: state.totalChanges + 1
      }
    
    case DECREMENT:
      return { 
        ...state, 
        count: state.count - 1,
        history: [ ...state.history, { type: "DECREMENT", value: state.count - 1 }],
        totalChanges: state.totalChanges + 1
      }

    case RESET:
      return { 
        ...state, 
        count: 0,
        history: [ ...state.history, { type: "RESET", value: 0 }],
        totalChanges: state.totalChanges + 1
      }

    case INCREMENT_BY:
      return { 
        ...state, 
        count: state.count + action.payload,
        history: [ ...state.history, { type: "INCREMENT_BY", value: state.count + action.payload }],
        totalChanges: state.totalChanges + 1
      }

    case DECREMENT_BY:
      return { 
        ...state, 
        count: state.count - action.payload,
        history: [...state.history, { type: "DECREMENT_BY", value: state.count - action.payload }],
        totalChanges: state.totalChanges + 1
      }

    default:
      return state
  }
}