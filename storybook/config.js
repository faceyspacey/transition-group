import { configure, setAddon, addDecorator } from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'
import { withKnobs } from '@kadira/storybook-addon-knobs'

import 'jest-storybook-facade/storybook-facade'


setAddon(infoAddon)
addDecorator(withKnobs)

function loadStories() {
  require('../__tests__/components.js')
}

configure(loadStories, module)
