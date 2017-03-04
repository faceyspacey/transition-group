// @flow

import React from 'react'
import ReactTransitionGroup from 'react-addons-transition-group'

import { setTimeoutAnimationFrame } from './dom-utils'

type Props = {
  children?: any,
  prefix?: string,
  duration?: number,
  delay?: number,

  appear?: string,
  enter?: string,
  leave?: string,

  appearDuration?: number,
  enterDuration?: number,
  leaveDuration?: number,

  appearDelay?: number,
  enterDelay?: number,
  leaveDelay?: number,

  onAppear?: Function,
  onEnter?: Function,
  onLeave?: Function,

  onEmpty?: Function,
  onFull?: Function,
  zeroElements?: number,
}

export default class AnimatedTransitionGroup extends React.Component {
  props: Props

  static defaultProps = {
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
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.onEmpty
        && React.Children.count(nextProps.children) === this.props.zeroElements
        && React.Children.count(this.props.children) > this.props.zeroElements
    ) {
      const duration = (this.props.leaveDuration || this.props.duration) + (this.props.leaveDelay || this.props.delay)
      setTimeoutAnimationFrame(this.props.onEmpty, duration)
    }

    if (this.props.onFull
        && React.Children.count(nextProps.children) > this.props.zeroElements
        && React.Children.count(this.props.children) === this.props.zeroElements
    ) {
      setTimeoutAnimationFrame(this.props.onFull, 0)
    }
  }

  render() {
    const {
      children,
      prefix,
      duration,
      delay,

      appear,
      enter,
      leave,

      enterDuration,
      leaveDuration,
      appearDuration,

      enterDelay,
      leaveDelay,
      appearDelay,

      onAppear,
      onEnter,
      onLeave,

      onEmpty,      // eslint-disable-line no-unused-vars
      onFull,       // eslint-disable-line no-unused-vars
      zeroElements, // eslint-disable-line no-unused-vars

      ...props // remaining props will only have what can be passed to <ReactTransitionGroup />
    } = this.props

    return (
      <ReactTransitionGroup {...props}>
        {
          React.Children.map(children || [], (child) => {
            if (!child) return null // cloneElement won't work on a non-existent child (null will filter it out)

            return React.cloneElement(child, {
              prefix,
              duration,
              delay,

              appear,
              enter,
              leave,

              enterDuration,
              leaveDuration,
              appearDuration,

              enterDelay,
              leaveDelay,
              appearDelay,

              onAppear,
              onEnter,
              onLeave,
              ...child.props,
            })
          }).filter(child => child)
        }
      </ReactTransitionGroup>
    )
  }
}

