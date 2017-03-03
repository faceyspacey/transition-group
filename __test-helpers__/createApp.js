import React from 'react'
import { connect } from 'react-redux'
import { createApp } from 'jest-redux-snap'

import configureStore from './configureStore'
import { AnimatedTransitionGroup, AnimatedChild } from '../src/index'

import './styles.css'


export default (groupProps, childProps, initialAction) => {
  const store = configureStore(initialAction)
  const TransitionGroup = transitionGroupHOC(groupProps, childProps)
  return createApp(store, TransitionGroup)
}

export const transitionGroupHOC = (groupProps, childProps) => {
  const Wrapper = ({ num, empty }) =>
    !empty ?
      <AnimatedTransitionGroup component="div" {...groupProps}>
        <AnimatedChild key={num} {...childProps}>
          <div className='child' style={{ backgroundColor: color(num) }} />
        </AnimatedChild>
      </AnimatedTransitionGroup>
      : <AnimatedTransitionGroup component="div" {...groupProps} />

  return connect(state => state)(Wrapper)
}

const color = num =>
  num % 2 === 0 ? 'blue' : 'purple'

