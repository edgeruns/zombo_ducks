import * as actions from './data/actions'
import * as selectors from './data/selectors'
import { slice } from './data/slice'

export { useSounds } from './hooks'
export { Sounds } from './types'
export { playSound } from './utils'

export default {
    slice,
    actions,
    selectors,
}
