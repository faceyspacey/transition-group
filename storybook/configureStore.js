import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'


const reducer = (state = { text: '', color: '' }, action = {}) => {
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

export default () => {
  const middlewares = applyMiddleware(thunk)
  const composeEnhancers = composeWithDevTools({ name: 'AnimatedTransitionGroup' })

  return createStore(reducer, composeEnhancers(middlewares))
}

