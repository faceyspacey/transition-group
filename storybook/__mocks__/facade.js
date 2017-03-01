export const describe = jasmine.currentEnv_.describe
export const xdescribe = jasmine.currentEnv_.xdescribe
export const fdescribe = jasmine.currentEnv_.fdescribe
export const xit = jasmine.currentEnv_.xit
export const fit = jasmine.currentEnv_.fit

export const beforeEach = jasmine.currentEnv_.beforeEach
export const afterEach = jasmine.currentEnv_.afterEach

const BeforeAll = beforeAll
export { BeforeAll as beforeAll }

const AfterAll = afterAll
export { AfterAll as afterAll }

const expectReal = expect
export { expectReal as expect }

const jestReal = jest
export { jestReal as jest }

export const action = () => {}
export const linkTo = () => {}
export const color = (label, color) => color


const originalIt = it

it = (name, test) => {
  originalIt(name, () => { // eslint-disable-line consistent-return
    const ret = test()

    // storybook `it` allows for returning the story component,
    // but undefined or promises is expected in jest
    if (isPromise(ret)) {
      return ret
    }
  })
}

const isPromise = val =>
  typeof val === 'object' && val.next

