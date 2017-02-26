import React from 'react'
import { mount } from 'enzyme'
import expect from 'expect'

//jest.mock('../storybookFacade')
jest.mock('../.storybook/facade')
import { storiesOf, describe, it, specs, color, snap } from '../.storybook/facade'


import { AnimatedTransitionGroup, AnimatedChild } from '../src/index'


const stories = storiesOf('AnimatedTransitionGroup', module)

stories
  .addWithInfo('test', 'foo bar', () => {
    const colr = color('Color', 'blue')

    const story =
      <AnimatedTransitionGroup
        component="div"
        className='foo'
        timeout={1000}
        name='fade'
      >
        <AnimatedChild key={colr}>
          <div style={{ width: 100, height: 100, backgroundColor: colr }} />
        </AnimatedChild>
      </AnimatedTransitionGroup>

    specs(() => describe('test', () => {
      it('Should have the Hello World label', () => {
        const options = {
          createNodeMock: () => {
            console.log('FOO')
            return {}
          },
        }

        // const component = renderer.create(story, options)
        const component = mount(story)
        console.log(123)
        snap(component)
        expect(1).toEqual(1)
      })
    }))

    return story
  })

