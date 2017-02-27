import renderer from 'react-test-renderer'


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

export const action = () => {}
export const linkTo = () => {}
export const color = (label, color) => color

export const it = (name, test) => {
  jasmine.currentEnv_.it(name, () => { // eslint-disable-line consistent-return
    const ret = test()

    // storybook `it` allows for returning the story component,
    // but undefined or promises is expected in jest
    if (typeof ret === 'object' && ret.next) {
      return ret
    }
  })
}

export const snap = (component) => {
  const tree = component.toJSON
    ? component.toJSON()
    : renderer.create(component).toJSON()

  expect(tree).toMatchSnapshot()
}
