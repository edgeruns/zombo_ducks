import { createSlice } from '@reduxjs/toolkit'

import { State } from './types'
import * as actions from './actions'
import { getInitialAudioEnabled, setInitialAudioEnabled } from '../utils'

const initialState: State = {
    isEnabled: getInitialAudioEnabled()
}

export const slice = createSlice({
    name: 'sounds',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(actions.toggle, (state) => {
            const newValue = !state.isEnabled

            state.isEnabled = newValue

            setInitialAudioEnabled(newValue)
        })
    }
})
