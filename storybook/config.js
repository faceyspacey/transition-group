import { configure, setAddon, addDecorator } from '@storybook/react'
import infoAddon from '@storybook/addon-info'
import { withKnobs } from '@storybook/addon-knobs'

import 'jest-storybook-facade/storybook-facade'

setAddon(infoAddon)
addDecorator(withKnobs)

function loadStories() {
  require('../__tests__/components.js')
}

configure(loadStories, module)
