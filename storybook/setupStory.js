import React from 'react'
import { Provider, connect } from 'react-redux'

import configureStore from './configureStore'
import { connectStore } from './connectStore'
import { AnimatedTransitionGroup, AnimatedChild } from '../src/index'

import './styles.css'


export default (groupProps, childProps) => {
  const store = configureStore()
  const TransitionGroup = transitionGroupHOC(groupProps, childProps)
  return connectStore(store, TransitionGroup)
}


export const transitionGroupHOC = (groupProps, childProps) => {
  const Wrapper = ({ num }) =>
    <AnimatedTransitionGroup component="div" duration={2500} {...groupProps}>
      <AnimatedChild key={num} {...childProps}>
        <div className='child' style={{ backgroundColor: color(num) }} />
      </AnimatedChild>
    </AnimatedTransitionGroup>

  return connect(state => state)(Wrapper)
}

const color = num =>
  num % 2 === 0 ? 'blue' : 'purple'

