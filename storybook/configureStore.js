import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'


const reducer = (state = { num: 0 }, action = {}) => {
  switch (action.type) {
    case 'SWITCH':
      return {
        num: state.num + 1,
      }
    default:
      return state
  }
}

export default () => {
  const middlewares = applyMiddleware(thunk)
  const composeEnhancers = composeWithDevTools({ name: 'AnimatedTransitionGroup' })

  return createStore(reducer, composeEnhancers(middlewares))
}

