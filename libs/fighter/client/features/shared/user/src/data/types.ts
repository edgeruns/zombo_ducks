import { User } from '../types'

import { slice } from './slice'

export type State = {
    user: User | null
}

export type FeatureState = {
    [slice.name]: State
}
