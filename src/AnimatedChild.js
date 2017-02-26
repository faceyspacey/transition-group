// @flow

import React from 'react'
import { addClass, removeAnimationClasses, setTimeoutAnimationFrame } from './dom-utils'


type Props = {
  children: any,

  onlyEnter?: ?boolean,
  name?: ?string,
  timeout?: ?number,

  appearTimeout?: ?number,
  enterTimeout?: ?number,
  leaveTimeout?: ?number,

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
    if (this.props.onlyEnter) {
      this.handleEntrance(done)
    }
    else {
      this.handleAppear(done)
    }
  }
  componentWillEnter(done: Function) {
    this.handleEntrance(done)
  }
  componentWillLeave(done: Function) {
    this.handleLeave(done)
  }

  handleAppear(done: Function) {
    const { timeout = 0, appearTimeout, appearDelay = 0 } = this.props
    const duration = (appearTimeout || timeout) + appearDelay + 1

    this.animate(done, 'appear', duration, appearDelay)
  }

  handleEntrance(done: Function) {
    const { timeout = 0, enterTimeout, enterDelay = 0 } = this.props
    const duration = (enterTimeout || timeout) + enterDelay + 1

    this.animate(done, 'enter', duration, enterDelay)
  }

  handleLeave(done: Function) {
    const { timeout = 0, leaveTimeout, leaveDelay = 0 } = this.props
    const duration = (leaveTimeout || timeout) + leaveDelay + 1

    this.animate(done, 'leave', duration, leaveDelay)
  }

  animate(done: Function, className: string, duration: number, delay: ?number) {
    const { name = '' } = this.props
    const activeClass = `${className}-active`

    addClass(this, className, name)
    setTimeoutAnimationFrame(() => addClass(this, activeClass, name), delay || 0)

    setTimeoutAnimationFrame(done, duration)
  }

  componentDidAppear() {
    removeAnimationClasses(this, this.props.name)

    if (this.props.onlyEnter && this.props.onEnter) {
      this.props.onEnter()
    }
    else if (this.props.onAppear) {
      this.props.onAppear()
    }
  }
  componentDidEnter() {
    removeAnimationClasses(this, this.props.name)

    if (this.props.onEnter) {
      this.props.onEnter()
    }
  }
  componentDidLeave() {
    if (this.props.onLeave) {
      this.props.onLeave()
    }
  }

  render() {
    return this.props.children
  }
}
