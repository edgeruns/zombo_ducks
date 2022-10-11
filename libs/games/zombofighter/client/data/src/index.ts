import { slice } from './slice'
import * as actions from './actions'
import * as selectors from './selectors'

export {
    Mode,
    Scene,
    Actions,
    SendAction,
    ReceiveAction,
    User,
    UserSkins,
    UserStatus,
    GameResultType,
    BodyParts,
} from './types'

export { MAX_ATTACK_COUNT, MAX_DEFENDE_COUNT } from './constants'

export default {
    slice,
    actions,
    selectors
}
