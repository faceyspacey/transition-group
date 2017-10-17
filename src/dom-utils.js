// @flow

import ReactDOM from 'react-dom' // eslint-disable-line
import type { Component } from 'react'

export function addClass(
  component: Component<*>,
  className: string,
  prefix: string,
) {
  if (!component._mounted) return

  try {
    // the original CSSTransition group did this (even in componentWillAppear/Enter)
    // clearly the element exists at this point in the lifecycle before added to the DOM
    const element: null | Element | Text = ReactDOM.findDOMNode(component)

    className = prefix ? `${prefix}-${className}` : className
    if (element && typeof element.className === 'string') {
      // $FlowFixMe: Flow is complaining about "element" possible being of type "Text" despite the typecheck for "string"
      element.className = `${element.className}  ${className}`
    }
  }
  catch (e) {
    if (
      process.env.NODE_ENV !== 'production' &&
      !process.env.STORYBOOK_GIT_BRANCH
    ) {
      console.warn(
        `Transition had the following issue adding classes: ${e.toString()}`,
      )
    }
  }
}

export function removeAnimationClasses(
  component: Component<*>,
  prefix: string,
  appear: string,
  enter: string,
  leave: string,
) {
  if (!component._mounted) return

  try {
    // dom node may have been removed if wrapped by an outer animation with a shorter duration (no big deal)
    const element: null | Element | Text = ReactDOM.findDOMNode(component)
    const classNameReg = !prefix
      ? `${enter}-active|${appear}-active|${leave}-active|${enter}|${appear}|${leave}`
      : `${prefix}-${enter}-active|${prefix}-${appear}-active|${prefix}-${leave}-active|${prefix}-${enter}|${prefix}-${appear}|${prefix}-${leave}`

    const re = new RegExp(classNameReg, 'g')
    if (element && typeof element.className === 'string') {
      // $FlowFixMe: Flow is complaining about "element" possible being of type "Text" despite the typecheck for "string"
      element.className = element.className.replace(re, '')
    }
  }
  catch (e) {
    if (
      process.env.NODE_ENV === 'production' &&
      !process.env.STORYBOOK_GIT_BRANCH
    ) {
      console.warn(
        `Transition had the following issue removing classes: ${e.toString()}`,
      )
    }
  }
}

export function setTimeoutAnimationFrame(func?: Function, ms: number = 0) {
  const callback = func
  if (typeof callback !== 'function') return

  setTimeout(() => {
    requestAnimationFrame(callback)
  }, ms)
}
