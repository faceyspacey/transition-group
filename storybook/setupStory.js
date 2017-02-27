import React from 'react'
import { Provider, connect } from 'react-redux'

import configureStore from './configureStore'
import { AnimatedTransitionGroup, AnimatedChild } from '../src/index'


export const TransitionGroupWrapper = ({ color, dispatch, text }) =>
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
  const store = configureStore()
  const story =
    <Provider store={store}>
      <TransitionGroup />
    </Provider>

  return {
    store,
    story,
  }
}
