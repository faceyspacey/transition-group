import React from 'react'
import renderer from 'react-test-renderer'
import ReactTestUtils from 'react-addons-test-utils'

import { describe, it, expect } from '../storybook/facade'
import setupStory, { TransitionGroupWrapper } from '../storybook/setupStory'



describe('AnimatedTransitionGroup 1', () => {
  it('blue', () => {
    console.log('RENDER')
    const { story, store } = setupStory()

    store.dispatch({ type: 'CHANGE', payload: 'blue' })
    store.dispatch({ type: 'BLUR', payload: 'blue' })

    const { color } = store.getState()
    expect(color).toEqual('blue')

    const component = renderer.create(story)
    expect(component).toMatchSnapshot()

    return story
  })

  it('red', () => {
    const { story, store } = setupStory()

    store.dispatch({ type: 'CHANGE', payload: 'red' })
    store.dispatch({ type: 'BLUR', payload: 'red' })

    const { color } = store.getState()
    expect(color).toEqual('red')

    const component = renderer.create(story)
    expect(component).toMatchSnapshot()

    return story
  })

  it('just tests, no story returned', () => {
    expect(1).toEqual(1)
    expect(2).toEqual(2)
    expect(3).toEqual(3)
    expect(1).toEqual(1)

    // notice no story is returned
  })

  it('more equal tests', () => {
    expect(66).toEqual(66)
    expect(55).toEqual(55)

    // notice no story is returned
  })
})

/**
describe('AnimatedTransitionGroup 2', () => {
  const { story, store } = setupStory()

  it('orange', () => {
    store.dispatch({ type: 'CHANGE', payload: 'orange' })
    store.dispatch({ type: 'BLUR', payload: 'orange' })

    const { color } = store.getState()
    expect(color).toEqual('orange')

    const component = renderer.create(story)
    expect(component).toMatchSnapshot()

    return story
  })

  it('green', () => {
    store.dispatch({ type: 'CHANGE', payload: 'green' })
    store.dispatch({ type: 'BLUR', payload: 'green' })

    const { color } = store.getState()
    expect(color).toEqual('green')

    const component = renderer.create(story)
    expect(component).toMatchSnapshot()

    return story
  })

  it('just tests, no story returned', () => {
    expect(1).toEqual(1)
    expect(2).toEqual(2)
    expect(3).toEqual(3)
    expect(1).toEqual(1)

    // notice no story is returned
  })

  it('more equal tests', () => {
    expect(66).toEqual(66)
    expect(55).toEqual(55)

    // notice no story is returned
  })
})
**/