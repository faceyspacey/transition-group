import { configure, setAddon, addDecorator} from '@kadira/storybook'
import infoAddon from '@kadira/react-storybook-addon-info'
export { withKnobs } from '@kadira/storybook-addon-knobs'

setAddon(infoAddon)
addDecorator(withKnobs)

function loadStories() {
  require('../stories/index.js')
}

configure(loadStories, module)