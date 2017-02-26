import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

import { AnimatedTransitionGroup, AnimatedChild } from '../src/index'


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


const TransitionGroupWrapper = ({ color, dispatch, text }) =>
  <AnimatedTransitionGroup
    component="div"
    className='foo'
    timeout={1000}
    name='fade'
  >
    <AnimatedChild key={color}>
      <div style={{ backgroundColor: 'pink' }}>
        <input
          style={{ color }}
          value={text}
          onChange={({ target: { value } }) => {
            dispatch({ type: 'CHANGE', payload: value })
          }}
          onBlur={({ target: { value } }) => {
            dispatch({ type: 'BLUR', payload: value })
          }}
        />

        <span style={{ paddingLeft: 10 }}>enter a color and blur it to change</span>
      </div>
    </AnimatedChild>
  </AnimatedTransitionGroup>

const TransitionGroup = connect(state => state)(TransitionGroupWrapper)


export default () => {
  const store = createStore(reducer)
  const story =
    <Provider store={store}>
      <TransitionGroup />
    </Provider>

  return {
    store,
    story,
  }
}
