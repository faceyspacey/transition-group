import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'

import createRenderer from './createRenderer'

export { snap } from './snap'


export const connectStore = (store, ReactComponentClass, mapStateToProps) => {
  let wrapper

  store.subscribe(() => {
    wrapper.forceUpdate()
  })

  const element =
    <Provider store={store}>
      <ReactiveWrapper
        ref={wr => wrapper = wr}
        store={store}
        Component={ReactComponentClass}
        mapStateToProps={mapStateToProps}
      />
    </Provider>

  const instance = renderer.create(element)
  const app = createRenderer(instance)

  app.element = () => element
  app.story = () => element

  app.getState = () => store.getState()
  app.dispatch = action => store.dispatch(action)

  return app
}


class ReactiveWrapper extends React.Component {
  render() {
    const { store, Component, mapStateToProps } = this.props

    const props = typeof mapStateToProps === 'function'
      ? mapStateToProps(store.getState(), store.dispatch)
      : mapStateToProps // object or undefined

    return <Component {...props} />
  }
}

