import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'


const reducer = (state = { num: 0, empty: false }, action = {}) => {
  switch (action.type) {
    case 'SWITCH':
      return {
        ...state,
        num: state.num + 1,
      }
    case 'EMPTY':
      return {
        ...state,
        empty: true,
      }
    case 'FULL':
      return {
        ...state,
        empty: false,
      }
    default:
      return state
  }
}

export default () => {
  const enhancer = composeWithDevTools({ name: 'AnimatedTransitionGroup' })
  return createStore(reducer, enhancer)
}

