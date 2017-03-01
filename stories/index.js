import setupStory from '../storybook/setupStory'


jest.mock('../src/dom-utils', () => ({
  addClass: (component, className, name) => {
    expect({ method: 'addClass', className, name }).toMatchSnapshot()
  },
  removeAnimationClasses: (component, name) => {
    expect({ method: 'removeAnimationClasses', name }).toMatchSnapshot()
  },
  setTimeoutAnimationFrame: (func, ms, className) => {
    expect({ method: 'setTimeoutAnimationFrame', ms, className }).toMatchSnapshot()
    func()
  },
}))


describe('AnimatedTransitionGroup 1', () => {
  it('appear', () => {
    const app = setupStory()

    console.log(app.tree())
    console.log(app.tree().children[0])

    app.snap()

    return app.story()
  })

  it('enter', () => {
    const app = setupStory()

    app.dispatch({ type: 'SWITCH' })

    console.log(app.tree())
    console.log(app.tree().children[0])

    app.snap()

    return app.story()
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
