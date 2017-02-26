import React from 'react'

import { 
  storiesOf, 
} from '@kadira/storybook'

import {
  specs,
  describe as describeReal,
  it as itReal,
} from 'storybook-addon-specifications'

import expect from 'expect'

export {
  storiesOf,
  action,
  linkTo,
} from '@kadira/storybook'

export { withKnobs, color } from '@kadira/storybook-addon-knobs'

export {
  beforeEach,
  afterEach,
  after,
  before,
  xit,
  fit,
  xdescribe,
} from 'storybook-addon-specifications'

expect.extend({
  toMatchSnapshot() {
    expect.assert(
      true,
      'expected a snapshot',
      'shot',
    )
    return this
  },
})

const exp = received => ({
  toEqual: (expected) => {
    const name = `expects ${received} to equal ${expected}`

    itReal(name, () => {
      console.log('expected', name, received, expected)
      expect(received).toEqual(expected)
    })
  },
})

export {
  exp,
}


export const snapshot = () => {}
export const snap = () => {}

export const it = (name, test) => {
  stories.addWithInfo(name, () => {
    let story

    specs(() => describeReal(name, () => {
      story = test()
    }))

    return story || <div>NO STORY AVAILABLE FOR THIS TEST</div>
  })
}

export const describe = (name, tests, mod) => {
  stories = storiesOf(name, mod)
  tests()
}


let stories


/** ATTEMPTS */
/** 
export const describeOld = (name, tests) => {
  // const stories = storiesOf(name, module)

  // stories
  //  .addWithInfo('test', () => {

  specs(() => describeReal(name, tests))
}




let grabbingStory
export const itOLD = (name, test) => {
  grabbingStory = true
  const story = test()
  grabbingStory = false

  if (story) {
    stories.addWithInfo(name, () => {
      specs(() => describeReal(name, test))

      return story
    })
  }
}


export const itOLDTWO = (name, test) => {
  stories.addWithInfo(name, () => {
    let story

    specs(() => describeReal(name, () => {
      story = test()
    }))

    return story
  })
}

export const itOLDTHREE = (name, test) => {
  let story

  specs(() => describeReal(name, () => {
    story = test()
  }))

  if (story) {
    stories.addWithInfo(name, () => story)
  }
}

**/