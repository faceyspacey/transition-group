const { addClass, removeAnimationClasses, setTimeoutAnimationFrame } = require.requireActual('../src/dom-utils')

jest.mock('react-dom', () => ({
  findDOMNode: component => component,
}))


describe('dom-utils', () => {
  it('addClass', () => {
    const component = { className: 'currentClassName', _mounted: true }
    addClass(component, 'appear', 'prefix')

    console.log(component)
    expect(component.className).toEqual('currentClassName  prefix-appear')
  })

  it('removeAnimationClasses', () => {
    const component = { className: 'appear enter appear-active enter-active', _mounted: true }

    removeAnimationClasses(component, '', 'appear', 'enter')

    console.log(component)
    expect(component.className).toEqual('   ')
  })

  it('removeAnimationClasses -- with prefix', () => {
    const component = { className: 'prefix-appear prefix-appear-active prefix-enter prefix-enter-active', _mounted: true }

    removeAnimationClasses(component, 'prefix', 'appear', 'enter')

    console.log(component)
    expect(component.className).toEqual('   ')
  })

  it('setTimeoutAnimationFrame', () => {
    jest.useFakeTimers()
    window.requestAnimationFrame = window.requestAnimationFrame || (func => func())
    const func = jest.fn()

    setTimeoutAnimationFrame(func, 100)

    jest.runAllTimers()
    expect(func).toBeCalled()
  })
})
