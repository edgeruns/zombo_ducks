import { slice } from './data/slice'
import * as actions from './data/actions'
import * as selectors from './data/selectors'

export { SingleGameContainer } from './containers/Game'
export type { BodyParts } from './data/types'

export default {
    slice,
    actions,
    selectors
}
