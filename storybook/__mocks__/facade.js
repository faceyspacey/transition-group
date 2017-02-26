import renderer from 'react-test-renderer'

export const storiesOf = () => {
  const api = {}
  let story

  api.add = (name, func) => {
    story = func()
    //snapshot(name, story)
    return api
  }

  api.addWithInfo = (name, info, func) => {
    func = func || info

    story = func()
    //snapshot(name, story)
    return api
  }

  api.addDecorator = () => api

  return api
}

export const action = () => {}

export const linkTo = () => {}

export const specs = (spec) => {
  spec()
}

const expec = expect
export { expec as expect }

export const describe = jasmine.currentEnv_.describe
export const beforeEach = jasmine.currentEnv_.beforeEach
export const afterEach = jasmine.currentEnv_.afterEach
export const xit = jasmine.currentEnv_.xit
export const xdescribe = jasmine.currentEnv_.xdescribe
export const fit = jasmine.currentEnv_.fit
export const after = () => {}
export const before = () => {}
export const it = (name, test) => {
  jasmine.currentEnv_.it(name, () => {
    const ret = test()

    // storybook `it` allows for returning story component, but undefined or promises is expected in jest
    if (typeof ret === 'object' && ret.next) {
      return ret
    }
  })
}

export const color = (label, color) => color

export const snapshot = (name, story) => {
  it(name, () => {
    const tree = renderer.create(story).toJSON()
    expect(tree).toMatchSnapshot()
  })
}

export const snap = (component) => {
  const tree = component.toJSON ? component.toJSON() : component
  expect(tree).toMatchSnapshot()
}
