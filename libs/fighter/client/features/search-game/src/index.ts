import * as actions from './data/actions'
import * as selectors from './data/selectors'
import { slice } from './data/slice'

export { SearchGameContainer } from './containers/Search'

export default {
    slice,
    actions,
    selectors,
}
