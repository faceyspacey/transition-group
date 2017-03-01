// eg: MyComponent
export const isClass = Component => typeof Component === 'function' && !isElement(Component) && !isInstance(Component)

// eg: renderer.create(<MyComponent />).toJSON()
export const isTree = Component => Component && Component.$$typeof && Component.$$typeof.toString() === 'Symbol(react.test.json)'

// eg: <MyComponent />
export const isElement = Component => Component && Component.$$typeof

// eg: renderer.create(<MyComponent />)
export const isInstance = Component => Component && Component.toJSON


export const isStore = arg => typeof arg === 'object' && arg.getState
