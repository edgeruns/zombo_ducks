import { slice } from './data/slice'
import * as actions from './data/actions'
import * as selectors from './data/selectors'

export { Sounds } from './types'
export { useSounds } from './hooks'
export { playSound } from './utils'

export default {
    slice,
    actions,
    selectors
}
