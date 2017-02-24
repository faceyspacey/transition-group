import React from 'react'
import { addClass, removeAnimationClasses, setTimeoutAnimationFrame } from './dom-utils'


export default class AnimatedChild extends React.Component {
  componentWillAppear(done) {
    if(this.props.onlyEnter) {
      this.handleEntrance(done)
    }
    else {
      this.handleAppear(done)
    }
  }
  componentWillEnter(done) {
    this.handleEntrance(done)
  }
  componentWillLeave(done) {
    this.handleLeave(done)
  }

  handleAppear(done) {
    let { timeout=0, appearTimeout, appearDelay=0 } = this.props
    timeout = (appearTimeout || timeout) + appearDelay + 1
    this.animate(done, 'appear', timeout, appearDelay)
  }

  handleEntrance(done) {
    let { timeout=0, enterTimeout, enterDelay=0 } = this.props
    timeout = (enterTimeout || timeout) + enterDelay + 1
    this.animate(done, 'enter', timeout, enterDelay)
  }

  handleLeave(done) {
    let {timeout=0, leaveTimeout, leaveDelay=0} = this.props
    timeout = (leaveTimeout || timeout) + leaveDelay + 1
    this.animate(done, 'leave', timeout, leaveDelay)
  }

  animate(done, className, timeout, delay) {
    let {transitionName=''} = this.props
    let activeClass = `${className}-active`

    addClass(this, className, transitionName)
    setTimeoutAnimationFrame(() => addClass(this, activeClass, transitionName), delay)

    setTimeoutAnimationFrame(done, timeout)
  }

  componentDidAppear() {
    removeAnimationClasses(this, this.props.transitionName)

    if(this.props.onlyEnter) {
      this.props.onEntered && this.props.onEntered()
    }
    else {
      this.props.onAppeared && this.props.onAppeared()
    }
  }
  componentDidEnter() {
    removeAnimationClasses(this, this.props.transitionName)
    this.props.onEntered && this.props.onEntered()
  }
  componentDidLeave() {
    this.props.onLeave && this.props.onLeave()
  }
  
  render() {
    return this.props.children
  }
}