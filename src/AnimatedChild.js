// @flow

import React from 'react'
import { addClass, removeAnimationClasses, setTimeoutAnimationFrame } from './dom-utils'



type Props = {
  children: any,
  prefix?: ?string,
  duration?: ?number,

  appearDuration?: ?number,
  enterDuration?: ?number,
  leaveDuration?: ?number,

  appearDelay?: ?number,
  enterDelay?: ?number,
  leaveDelay?: ?number,

  onAppear?: ?Function,
  onEnter?: ?Function,
  onLeave?: ?Function,
}

export default class AnimatedChild extends React.Component {
  props: Props

  componentWillAppear(done: Function) {
    const { duration = 0, appearDuration, appearDelay = 0 } = this.props
    const doneTimeout = (appearDuration || duration) + appearDelay + 1

    this.animate(done, 'appear', doneTimeout, appearDelay)
  }
  componentWillEnter(done: Function) {
    const { duration = 0, enterDuration, enterDelay = 0 } = this.props
    const doneTimeout = (enterDuration || duration) + enterDelay + 1

    this.animate(done, 'enter', doneTimeout, enterDelay)
  }
  componentWillLeave(done: Function) {
    const { duration = 0, leaveDuration, leaveDelay = 0 } = this.props
    const doneTimeout = (leaveDuration || duration) + leaveDelay + 1

    this.animate(done, 'leave', doneTimeout, leaveDelay)
  }

  // called when by `done` callbacks above:
  componentDidAppear() {
    removeAnimationClasses(this, this.props.prefix)

    if (this.props.onAppear) {
      this.props.onAppear()
    }
  }
  componentDidEnter() {
    removeAnimationClasses(this, this.props.prefix)

    if (this.props.onEnter) {
      this.props.onEnter()
    }
  }
  componentDidLeave() {
    if (this.props.onLeave) {
      this.props.onLeave()
    }
  }

  animate(done: Function, className: string, duration: number, delay: ?number) {
    const { prefix = '' } = this.props
    const activeClass = `${className}-active`

    addClass(this, className, prefix)
    setTimeoutAnimationFrame(() => addClass(this, activeClass, prefix), delay || 0, className)

    setTimeoutAnimationFrame(done, duration, 'done') // final param only recorded in shapshot tests
  }

  render() {
    return this.props.children
  }
}
