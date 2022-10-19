import { createSlice } from '@reduxjs/toolkit'

import { State } from './types'
import * as actions from './actions'

const initialState: State = {
    profit: 0
}

export const slice = createSlice({
    name: 'result',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(actions.get.fulfilled, (state, action) => {
            const { profit } = action.payload

            state.profit = profit
        })

        builder.addCase(actions.reset, (state) => {
            state.profit = 0
        })
    }
})
