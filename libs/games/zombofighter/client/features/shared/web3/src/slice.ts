import { Player } from '@apps/games/zombofighter/crypto-api'
import { createSlice } from '@reduxjs/toolkit'

import { getCurrentPlayer } from './actions'

type State = {
    player: Player | null
}

const initialState: State = {
    player: null,
}

export const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrentPlayer.fulfilled, (state, action) => {
            state.player = action.payload
        })
    },
})
