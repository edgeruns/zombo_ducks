import { User } from '../types'
import { slice } from './slice'

export type State = {
    user: User
}

export type FeatureState = {
    [slice.name]: State
}
