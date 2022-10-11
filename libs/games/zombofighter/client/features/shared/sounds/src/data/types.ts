import { slice } from './slice'

export type State = {
    isEnabled: boolean
}

export type AppState = {
    [slice.name]: State
}
