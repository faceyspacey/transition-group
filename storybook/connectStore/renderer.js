import { isInstance } from './utils'


export function DeepRenderer(instance, tree) {
  this._instance = instance
  this._tree = tree
}

DeepRenderer.prototype = {
  // calling tree() insures having up to date instance in response to state changes
  tree() {
    return isInstance(this._instance) ? this._instance.toJSON() : this._tree
  },

  // calling snap will of course also use most up to date instance
  snap() {
    expect(this.tree()).toMatchSnapshot()
    return this
  },

  // this._instance can be passed to snap(renderer.instance()) -- this is as opposed to doing this.snap()
  component() {
    return this._instance
  },
}


export function ShallowRenderer(renderer, element, tree) {
  this._renderer = renderer
  this._element = element
  this._tree = tree
}

ShallowRenderer.prototype = {
  tree() {
    return this._element ? this._renderer.getRenderOutput() : this._tree
  },
  snap() {
    expect(this.tree()).toMatchSnapshot()
    return this
  },
  component() {
    return this._element
  },
}
