// @flow

import React from 'react'
import { addClass, removeAnimationClasses, setTimeoutAnimationFrame } from './dom-utils'


type Props = {
  children: any,
  prefix: string,
  duration: number,
  delay: number,

  appear: string,
  enter: string,
  leave: string,

  appearDuration: number,
  enterDuration: number,
  leaveDuration: number,

  appearDelay: number,
  enterDelay: number,
  leaveDelay: number,

  onAppear?: ?Function,
  onEnter?: ?Function,
  onLeave?: ?Function,
}

export default class AnimatedChild extends React.Component {
  props: Props

  componentWillAppear(done: Function) {
    const { appear, appearDuration, duration, appearDelay, delay } = this.props
    const doneTimeout = (appearDuration || duration) + (appearDelay || delay) + 1

    this.animate(done, appear, doneTimeout, appearDelay || delay)
  }
  componentWillEnter(done: Function) {
    const { enter, enterDuration, duration, enterDelay, delay } = this.props
    const doneTimeout = (enterDuration || duration) + (enterDelay || delay) + 1

    this.animate(done, enter, doneTimeout, enterDelay || delay)
  }
  componentWillLeave(done: Function) {
    const { leave, leaveDuration, duration, leaveDelay, delay } = this.props
    const doneTimeout = (leaveDuration || duration) + (leaveDelay || delay) + 1

    this.animate(done, leave, doneTimeout, leaveDelay || delay)
  }

  // called when by `done` callbacks above:
  componentDidAppear() {
    const { prefix, appear, enter } = this.props
    removeAnimationClasses(this, prefix, appear, enter)

    if (this.props.onAppear) {
      this.props.onAppear()
    }
  }
  componentDidEnter() {
    const { prefix, appear, enter } = this.props
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
    const { prefix } = this.props
    const activeClass = `${className}-active`

    addClass(this, className, prefix)
    setTimeoutAnimationFrame(() => addClass(this, activeClass, prefix), delay, className)

    setTimeoutAnimationFrame(done, duration, 'done callbacks') // final param only recorded in shapshot tests
  }

  render() {
    return this.props.children
  }
}
