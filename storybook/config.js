import { configure, setAddon, addDecorator } from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import './facade'

window.regeneratorRuntime = require('babel-runtime/regenerator')

setAddon(infoAddon)
addDecorator(withKnobs)

function loadStories() {
  require('../stories/index.js')
}

configure(loadStories, module)
