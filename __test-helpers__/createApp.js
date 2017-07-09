import React from 'react'
import { connect } from 'react-redux'
import { createApp } from 'jest-redux-snap'

import configureStore from './configureStore'
import { TransitionGroup, Transition } from '../src/index'

import './styles.css'


export default (groupProps, childProps, initialAction) => {
  const store = configureStore(initialAction)
  const TransitionGroup = transitionGroupHOC(groupProps, childProps)
  return createApp(store, TransitionGroup)
}

export const transitionGroupHOC = (groupProps, childProps) => {
  const Wrapper = ({ num, empty }) =>
    !empty ?
      <TransitionGroup component="div" {...groupProps}>
        <Transition key={num} {...childProps}>
          <div className='child' style={{ backgroundColor: color(num) }} />
        </Transition>
      </TransitionGroup>
      : <TransitionGroup component="div" {...groupProps} />

  return connect(state => state)(Wrapper)
}

const color = num =>
  num % 2 === 0 ? 'blue' : 'purple'

