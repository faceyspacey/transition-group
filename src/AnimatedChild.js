// @flow

import React from 'react'
import { addClass, removeAnimationClasses, setTimeoutAnimationFrame } from './dom-utils'


type Props = {
  children: any,
  prefix?: string,
  duration?: number,        // eslint-disable-line react/no-unused-prop-types
  delay?: number,           // eslint-disable-line react/no-unused-prop-types

  appear?: string,          // eslint-disable-line react/no-unused-prop-types
  enter?: string,           // eslint-disable-line react/no-unused-prop-types
  leave?: string,           // eslint-disable-line react/no-unused-prop-types

  appearDuration?: number,  // eslint-disable-line react/no-unused-prop-types
  enterDuration?: number,   // eslint-disable-line react/no-unused-prop-types
  leaveDuration?: number,   // eslint-disable-line react/no-unused-prop-types

  appearDelay?: number,     // eslint-disable-line react/no-unused-prop-types
  enterDelay?: number,      // eslint-disable-line react/no-unused-prop-types
  leaveDelay?: number,      // eslint-disable-line react/no-unused-prop-types

  onAppear?: ?Function,
  onEnter?: ?Function,
  onLeave?: ?Function,
}

export default class AnimatedChild extends React.Component {
  props: Props

  getDefaultProps() {
    return {
      prefix: '',
      duration: 0,
      delay: 0,

      appear: 'appear',
      enter: 'enter',
      leave: 'leave',

      appearDuration: 0,
      enterDuration: 0,
      leaveDuration: 0,

      appearDelay: 0,
      enterDelay: 0,
      leaveDelay: 0,

      zeroElements: 0,
      ...this.props,
    }
  }

  componentWillAppear(done: Function) {
    const { appear, appearDuration, duration, appearDelay, delay } = this.getDefaultProps()
    const doneTimeout = (appearDuration || duration) + (appearDelay || delay) + 1

    this.animate(done, appear, doneTimeout, appearDelay || delay)
  }
  componentWillEnter(done: Function) {
    const { enter, enterDuration, duration, enterDelay, delay } = this.getDefaultProps()
    const doneTimeout = (enterDuration || duration) + (enterDelay || delay) + 1

    this.animate(done, enter, doneTimeout, enterDelay || delay)
  }
  componentWillLeave(done: Function) {
    const { leave, leaveDuration, duration, leaveDelay, delay } = this.getDefaultProps()
    const doneTimeout = (leaveDuration || duration) + (leaveDelay || delay) + 1

    this.animate(done, leave, doneTimeout, leaveDelay || delay)
  }

  // called when by `done` callbacks above:
  componentDidAppear() {
    const { prefix, appear, enter } = this.getDefaultProps()
    removeAnimationClasses(this, prefix, appear, enter)

    if (this.props.onAppear) {
      this.props.onAppear()
    }
  }
  componentDidEnter() {
    const { prefix, appear, enter } = this.getDefaultProps()
    removeAnimationClasses(this, prefix, appear, enter)

    if (this.props.onEnter) {
      this.props.onEnter()
    }
  }
  componentDidLeave() {
    if (this.props.onLeave) {
      this.props.onLeave()
    }
  }

  animate(done: Function, className: string, duration: number, delay: number) {
    const { prefix = '' } = this.props
    const activeClass = `${className}-active`

    addClass(this, className, prefix)
    setTimeoutAnimationFrame(() => addClass(this, activeClass, prefix), delay, className)

    setTimeoutAnimationFrame(done, duration, 'done callbacks') // final param only recorded in shapshot tests
  }

  render() {
    return this.props.children
  }
}
