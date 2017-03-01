import createRenderer from './createRenderer'

export default function snap(target, props, deep = true) {
  return createRenderer(target, props, deep).snap()
}
