import React from 'react'

import { storiesOf } from '@kadira/storybook'
import Expect from 'expect'

import {
  specs,
  beforeEach,
  afterEach,
  before, // not supported in jest, use beforeAll
  after,  // not supported in jest, use afterAll
  xit,
  xdescribe,
  describe as Describe,
  it as It,
} from 'storybook-addon-specifications'

export { storiesOf, action, linkTo } from '@kadira/storybook'
export { withKnobs } from '@kadira/storybook-addon-knobs'

export {
  beforeEach,
  afterEach,
  xit,
  xdescribe,
}

export const beforeAll = before
export const afterAll = after
export const color = (label, color) => color

// this should actually perform the `only` function at some point
export const fdescribe = (name, tests) => describe(name, tests)
export const fit = (name, test) => it(name, test)


let stories

export const describe = (name, tests) => {
  stories = storiesOf(name, module)
  tests()
}

export const it = (name, test) => {
  stories.addWithInfo(name, () => {
    let story

    specs(() => Describe(name, () => {
      story = test()
    }))

    return story || <div>NO STORY AVAILABLE FOR THIS TEST</div>
  })
}


export const expect = (received) => {
  const callExpect = (method, ...expectedArgs) => {
    const expectedValue = expectedArgs[0] || ''
    const receivedFormatted = formatReceived(received, method)
    const name = `expects ${receivedFormatted} ${method} ${expectedValue}`

    It(name, () => {
      Expect(received)[method](...expectedArgs)
    })
  }

  return expectMethods.reduce((expectObject, method) => {
    expectObject[method] = callExpect.bind(null, method)
    return expectObject
  }, {})
}

const formatReceived = (received, method) => {
  if (method === 'toMatchSnapshot') {
    return 'component or value'
  }
  else if (typeof received === 'function') {
    return received.toString()
  }
  else if (typeof received === 'object') {
    return JSON.stringify(received, null, 1)
  }

  return received
}


export const snap = (received) => {
  expect(received).toMatchSnapshot()
}

const expectMethods = [
  'toBeAn',
  'toBeFalsy',
  'toBeFewerThan',
  'toBeMoreThan',
  'toBeTruthy',
  'toContain',
  'toContainKey',
  'toContainKeys',
  'toNotBeAn',
  'toNotContain',
  'toNotContainKey',
  'toNotContainKeys',
  'toNotInclude',
  'toNotIncludeKey',
  'toNotIncludeKeys',
  'withArgs',
  'withContext',
  'toBe',
  'toBeA',
  'toBeGreaterThan',
  'toBeGreaterThanOrEqualTo',
  'toBeLessThan',
  'toBeLessThanOrEqualTo',
  'toEqual',
  'toExclude',
  'toExcludeKey',
  'toExcludeKeys',
  'toExist',
  'toHaveBeenCalled',
  'toHaveBeenCalledWith',
  'toInclude',
  'toIncludeKey',
  'toIncludeKeys',
  'toMatch',
  'toNotBe',
  'toNotBeA',
  'toNotEqual',
  'toNotExist',
  'toNotHaveBeenCalled',
  'toNotMatch',
  'toNotThrow',
  'toThrow',
  'toMatchSnapshot',
]

Expect.extend({
  toMatchSnapshot() {
    Expect.assert(
      true,
      'expected a snapshot',
      'shot',
    )
    return this
  },
})


export const jest = {
  mock: () => null,
}



window.jest = jest
window.expect = expect
window.describe = describe
window.xdescribe = xdescribe
window.fdescribe = fdescribe
window.it = it
window.xit = xit
window.fit = fit
window.beforeEach = beforeEach
window.afterEach = afterEach
window.beforeAll = beforeAll
window.afterAll = afterAll


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
**/
