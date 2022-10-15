import { createSlice } from '@reduxjs/toolkit'

import { State } from './types'
import * as actions from './actions'

const initialState: State = {
    gameId: null
}

export const slice = createSlice({
    name: 'searchGame',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(actions.found, (state, action) => {
            state.gameId = action.payload.gameId
        })

        builder.addCase(actions.reset, (state) => {
            state.gameId = null
        })
    }
})
