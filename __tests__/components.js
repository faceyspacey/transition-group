import createApp from '../__test-helpers__/createApp'
import configureStore from '../__test-helpers__/configureStore'


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
    const app = createApp()

    console.log(app.tree())
    console.log(app.tree().children[0])

    app.snap()

    return app.story()
  })

  it('enter + leave', () => {
    const app = createApp()

    app.snap({ type: 'SWITCH' })

    console.log(app.tree())
    console.log(app.tree().children[0])

    return app.story()
  })

  it('enter + leave -- simple duration', () => {
    const app = createApp({ duration: 500 })

    app.snap({ type: 'SWITCH' })

    console.log(app.tree())
    console.log(app.tree().children[0])

    return app.story()
  })
})


describe('<AnimatedTransitionGroup /> -- all props filled', () => {
  it('appear', () => {
    const onAppear = jest.fn()
    const app = createApp(allProps({ onAppear }))

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onAppear).toBeCalled()

    app.snap()

    return app.story()
  })

  it('enter', () => {
    const onEnter = jest.fn()
    const app = createApp(allProps({ onEnter }), {}, { type: 'EMPTY' })

    app.snap({ type: 'FULL' })

    console.log(app.tree())
    console.log(app.tree().children[0])
    expect(onEnter).toBeCalled()

    return app.story()
  })

  it('leave', () => {
    const onLeave = jest.fn()
    const app = createApp(allProps({ onLeave }))

    app.snap({ type: 'EMPTY' })

    console.log(app.tree())
    expect(onLeave).toBeCalled()

    return app.story()
  })

  it('onFull callback', () => {
    const onFull = jest.fn()
    const app = createApp({ onFull }, {}, { type: 'EMPTY' })

    console.log(app.tree())
    app.snap({ type: 'FULL' })

    console.log(app.tree())
    expect(onFull).toBeCalled()

    return app.story()
  })

  it('onEmpty callback', () => {
    const onEmpty = jest.fn()
    const app = createApp({ onEmpty })

    console.log(app.tree())
    app.snap({ type: 'EMPTY' })

    console.log(app.tree())
    expect(onEmpty).toBeCalled()

    return app.story()
  })
})


describe('<AnimatedChild /> -- all props filled', () => {
  it('appear', () => {
    const onAppear = jest.fn()
    const app = createApp({}, allProps({ onAppear }))

    console.log(app.tree())
    console.log(app.tree().children[0])

    expect(onAppear).toBeCalled()

    app.snap()

    return app.story()
  })

  it('enter', () => {
    const onEnter = jest.fn()
    const app = createApp({}, allProps({ onEnter }), { type: 'EMPTY' })

    app.snap({ type: 'FULL' })

    console.log(app.tree())
    console.log(app.tree().children[0])
    expect(onEnter).toBeCalled()

    return app.story()
  })

  it('leave', () => {
    const onLeave = jest.fn()
    const app = createApp({}, allProps({ onLeave }))

    app.snap({ type: 'EMPTY' })

    console.log(app.tree())
    expect(onLeave).toBeCalled()

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
