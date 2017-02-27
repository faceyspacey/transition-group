import { createStore } from 'redux'


const reducer = (state = { text: '', types: [] }, action = {}) => {
  if (action.type === 'CHANGE') {
    return {
      ...state,
      text: action.payload,
    }
  }
  else if (action.type === 'BLUR') {
    return {
      ...state,
      color: action.payload,
    }
  }

  return state
}

export default () =>
  createStore(reducer)
