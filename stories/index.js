import React from 'react'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import { storiesOf, describe, it, exp as expect, specs, color, snap } from '../storybook/facade'
import { AnimatedTransitionGroup, AnimatedChild } from '../src/index'

const reducer = (state = { text: '', types: [] }, action = {}) => {
  if (action.type === 'CHANGE') {
    return {
      ...state,
      text: action.payload,
    }
  }
  else if (action.type === 'BLUR') {
    return {
      ...state,
      color: action.payload,
    }
  }

  return state
}

const store = createStore(reducer)

const storyComponent = ({ backgroundColor, color, dispatch, text }) =>
  <AnimatedTransitionGroup
    component="div"
    className='foo'
    timeout={1000}
    name='fade'
  >
    <AnimatedChild key={color}>
      <div style={{ backgroundColor }}>
        <input
          style={{ color }}
          value={text}
          onChange={({ target: { value } }) => {
            console.log('CHANGE', value)
            dispatch({ type: 'CHANGE', payload: value })
          }}
          onBlur={({ target: { value } }) => {
            dispatch({ type: 'BLUR', payload: value })
          }}
        />

        <span>enter a color and blur it to change</span>
      </div>
    </AnimatedChild>
  </AnimatedTransitionGroup>

const STORY = connect(state => state)(storyComponent)


// const stories = storiesOf('AnimatedTransitionGroup', module)

describe('test', () => {
  const colr = color('Color', 'green')

  const story =
    <Provider store={store}>
      <STORY backgroundColor={colr} />
    </Provider>

  it('blue', () => {
    store.dispatch({ type: 'CHANGE', payload: 'blue' })
    store.dispatch({ type: 'BLUR', payload: 'blue' })

    const { color } = store.getState()
    expect(color).toEqual('blue')

    const component = renderer.create(story)
    expect(component).toMatchSnapshot()

    return story
  })

  it('red', () => {
    store.dispatch({ type: 'CHANGE', payload: 'red' })
    store.dispatch({ type: 'BLUR', payload: 'red' })

    const { color } = store.getState()
    expect(color).toEqual('red')

    const component = renderer.create(story)
    expect(component).toMatchSnapshot()

    return story
  })
}, module)


describe('test2', () => {
  // const colr = color('Color', 'green')
  const colr = 'green'

  const story =
    <Provider store={store}>
      <STORY backgroundColor={colr} />
    </Provider>

  it('back equal tests', () => {
    expect(1).toEqual(1)
    expect(2).toEqual(2)
    expect(3).toEqual(3)
    expect(1).toEqual(1)
  })

  it('more equal tests', () => {
    expect(66).toEqual(66)
    expect(55).toEqual(55)
  })

  it('blue', () => {
    store.dispatch({ type: 'CHANGE', payload: 'blue' })
    store.dispatch({ type: 'BLUR', payload: 'blue' })

    const { color } = store.getState()
    expect(color).toEqual('blue')

    const component = renderer.create(story)
    expect(component).toMatchSnapshot()

    return story
  })

  it('red', () => {
    store.dispatch({ type: 'CHANGE', payload: 'red' })
    store.dispatch({ type: 'BLUR', payload: 'red' })

    const { color } = store.getState()
    expect(color).toEqual('red')

    const component = renderer.create(story)
    expect(component).toMatchSnapshot()

    return story
  })
}, module)