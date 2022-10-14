import { slice } from './slice'

export type State = {
    gameId: string | null
}

export type FeatureState = {
    [slice.name]: State
}

export type FoundPayload = {
    gameId: string
}
