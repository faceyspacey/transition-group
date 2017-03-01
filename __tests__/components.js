import setupStory from '../storybook/setupStory'
import configureStore from '../storybook/configureStore'


jest.mock('../src/dom-utils', () => ({
  addClass: (component, className, name) => {
    const log = { method: 'addClass', className, name }
    console.log(log)
    expect(log).toMatchSnapshot()
  },
  removeAnimationClasses: (component, name) => {
    const log = { method: 'removeAnimationClasses', name }
    console.log(log)
    expect(log).toMatchSnapshot()
  },
  setTimeoutAnimationFrame: (func, ms, className) => {
    const log = { method: 'setTimeoutAnimationFrame', ms, className }
    console.log(log)
    expect(log).toMatchSnapshot()

    func()
  },
}))


describe('<AnimatedTransitionGroup /> + <AnimatedChild /> -- no props', () => {
  it('appear', () => {
    const app = setupStory()

    console.log(app.tree())
    console.log(app.tree().children[0])

    app.snap()

    return app.story()
  })

  it('enter + leave', () => {
    const app = setupStory()

    app.dispatch({ type: 'SWITCH' })

    console.log(app.tree())
    console.log(app.tree().children[0])

    app.snap()

    return app.story()
  })

  it('enter + leave -- simple duration', () => {
    const app = setupStory({ duration: 500 })

    app.dispatch({ type: 'SWITCH' })

    console.log(app.tree())
    console.log(app.tree().children[0])

    app.snap()

    return app.story()
  })
})


describe('<AnimatedTransitionGroup /> -- all props filled', () => {
  it('appear', () => {
    const onAppear = jest.fn()
    const app = setupStory(allProps({ onAppear }))

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onAppear).toBeCalled()

    app.snap()

    return app.story()
  })

  it('enter', () => {
    const store = configureStore()
    const onEnter = jest.fn()

    store.dispatch({ type: 'EMPTY' })

    const app = setupStory(allProps({ onEnter }), {}, store)

    app.dispatch({ type: 'FULL' })

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onEnter).toBeCalled()

    app.snap()

    return app.story()
  })

  it('leave', () => {
    const onLeave = jest.fn()
    const app = setupStory(allProps({ onLeave }))

    app.dispatch({ type: 'EMPTY' })

    console.log(app.tree())

    expect(onLeave).toBeCalled()

    app.snap()

    return app.story()
  })

  it('onFull callback', () => {
    const store = configureStore()
    const onFull = jest.fn()
    store.dispatch({ type: 'EMPTY' })
    const app = setupStory({ onFull }, {}, store)

    console.log(app.tree())
    app.dispatch({ type: 'FULL' })

    console.log(app.tree())
    expect(onFull).toBeCalled()

    app.snap()

    return app.story()
  })

  it('onEmpty callback', () => {
    const store = configureStore()
    const onEmpty = jest.fn()
    const app = setupStory({ onEmpty }, {}, store)

    console.log(app.tree())
    app.dispatch({ type: 'EMPTY' })

    console.log(app.tree())
    expect(onEmpty).toBeCalled()

    app.snap()

    return app.story()
  })
})


describe('<AnimatedChild /> -- all props filled', () => {
  it('appear', () => {
    const onAppear = jest.fn()
    const app = setupStory({}, allProps({ onAppear }))

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onAppear).toBeCalled()

    app.snap()

    return app.story()
  })

  it('enter', () => {
    const store = configureStore()
    const onEnter = jest.fn()

    store.dispatch({ type: 'EMPTY' })

    const app = setupStory({}, allProps({ onEnter }), store)

    app.dispatch({ type: 'FULL' })

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onEnter).toBeCalled()

    app.snap()

    return app.story()
  })

  it('leave', () => {
    const onLeave = jest.fn()
    const app = setupStory({}, allProps({ onLeave }))

    app.dispatch({ type: 'EMPTY' })

    console.log(app.tree())

    expect(onLeave).toBeCalled()

    app.snap()

    return app.story()
  })
})


const allProps = moreProps => ({
  prefix: 'horizontal',
  duration: 500,
  delay: 5,

  appear: 'APPEAR',
  enter: 'ENTER',
  leave: 'LEAVE',

  appearDuration: 666,
  enterDuration: 667,
  leaveDuration: 668,

  appearDelay: 10,
  enterDelay: 20,
  leaveDelay: 30,

  ...moreProps,
})
