import React from 'react'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-addons-test-utils'

import { isClass, isTree, isElement, isInstance } from './utils'
import { DeepRenderer, ShallowRenderer } from './renderer'


export default function createRenderer(target, props, deep = true) {
  if (typeof props === 'boolean') {
    deep = props
    props = undefined
  }

  if (!deep) {
    return _createShallowRenderer(target, props)
  }

  let tree
  let instance

  if (isClass(target)) {
    instance = renderer.create(<target {...props} />)
  }
  else if (isTree(target)) {
    tree = target
  }
  else if (isElement(target)) {
    instance = renderer.create(target)
  }
  else if (isInstance(target)) {
    instance = target
  }
  else {
    tree = target
  }

  return new DeepRenderer(instance, tree)
}


export function _createShallowRenderer(target, props) {
  const renderer = ReactTestUtils.createRenderer()

  let tree
  let element

  if (isClass(target)) {
    element = <target {...props} />
    renderer.render(element)
  }
  else if (isTree(target)) {
    tree = target
  }
  else if (isElement(target)) {
    element = target
    renderer.render(element)
  }
  else {
    tree = target
  }

  return new ShallowRenderer(renderer, element, tree)
}


// ReactTestUtils does not create component instances that play nice with Jest mocks.
// A mocked component passed to ReactTestUtils.createRenderer().render(component)
// will expect there to be no props passed, which defeats its purpose.

const originalError = global.console.error.bind(global.console)

global.console.error = (...args) => {
  const msg = args[0]
  if (msg && msg.indexOf('Unknown prop') > -1) {
    return
  }

  return originalError(...args)
}
