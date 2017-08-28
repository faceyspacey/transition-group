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

  onBeforeAppear?: ?Function,
  onBeforeEnter?: ?Function,
  onBeforeLeave?: ?Function,

  onAppear?: ?Function,
  onEnter?: ?Function,
  onLeave?: ?Function,
}

export default class Transition extends React.Component {
  props: Props
  _mounted: boolean

  componentWillMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }

  prepDefaultProps() {
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
    const { appear, appearDuration, duration, appearDelay, delay } = this.prepDefaultProps()
    const doneTimeout = (appearDuration || duration) + (appearDelay || delay) + 1

    this.animate(done, appear, doneTimeout, appearDelay || delay)
  }
  componentWillEnter(done: Function) {
    const { enter, enterDuration, duration, enterDelay, delay } = this.prepDefaultProps()
    const doneTimeout = (enterDuration || duration) + (enterDelay || delay) + 1

    this.animate(done, enter, doneTimeout, enterDelay || delay)
  }
  componentWillLeave(done: Function) {
    const { leave, leaveDuration, duration, leaveDelay, delay } = this.prepDefaultProps()
    const doneTimeout = (leaveDuration || duration) + (leaveDelay || delay) + 1

    this.animate(done, leave, doneTimeout, leaveDelay || delay)
  }

  // triggered by `done` callbacks above:
  componentDidAppear() {
    const { prefix, appear, enter, leave } = this.prepDefaultProps()
    if (this.props.onBeforeAppear) {
      this.props.onBeforeAppear()
    }

    removeAnimationClasses(this, prefix, appear, enter, leave)

    if (this.props.onAppear) {
      this.props.onAppear()
    }
  }
  componentDidEnter() {
    const { prefix, appear, enter, leave } = this.prepDefaultProps()
    if (this.props.onBeforeEnter) {
      this.props.onBeforeEnter()
    }

    removeAnimationClasses(this, prefix, appear, enter, leave)

    if (this.props.onEnter) {
      this.props.onEnter()
    }
  }
  componentDidLeave() {
    const { prefix, appear, enter, leave } = this.prepDefaultProps()
    if (this.props.onBeforeLeave) {
      this.props.onBeforeLeave()
    }

    removeAnimationClasses(this, prefix, appear, enter, leave)

    if (this.props.onLeave) {
      this.props.onLeave()
    }
  }

  animate(done: Function, className: string, duration: number, delay: number) {
    const { prefix = '' } = this.props
    const activeClass = `${className}-active`

    // the class the dom node appears with
    addClass(this, className, prefix)

    // the class applied at least 34ms (2 animation frames) later to trigger animation
    setTimeoutAnimationFrame(() => addClass(this, activeClass, prefix), delay + 34, className)

    // will trigger `ComponentDid..` methods and remove all classes + fire callbacks
    setTimeoutAnimationFrame(done, duration + 34, 'done callbacks') // final param only recorded in shapshot tests
  }

  render() {
    return this.props.children
  }
}
