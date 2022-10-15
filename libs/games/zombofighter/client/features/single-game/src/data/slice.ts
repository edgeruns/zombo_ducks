import { createSlice } from '@reduxjs/toolkit'

import { Action, Game } from '@apps/games/zombofighter/domain'

import { State } from './types'
import { playersAdapter } from './adapters'

import * as actions from './actions'

const initialState: State = {
    game: new Game().getState(),
    players: playersAdapter.getInitialState(),
    isActionSended: false,
    selectedAttacks: [0, 0, 0],
    selectedDefences: [0, 0, 0],
    isQuitPopupVisible: false
}

export const slice = createSlice({
    name: 'singleGame',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(actions.init, (state, action) => {
            const { gameState, players } = action.payload

            state.game = gameState

            playersAdapter.upsertMany(state.players, players)
        })

        builder.addCase(actions.startRound, (state) => {
            const game = Game.init(state.game)

            game.startRound()

            state.game = game.getState()
            state.isActionSended = false
            state.selectedAttacks = [0, 0, 0]
            state.selectedDefences = [0, 0, 0]
        })

        builder.addCase(actions.sendAction.fulfilled, (state, action) => {
            const { uuid, damage, protection } = action.payload

            const game = Game.init(state.game)

            game.setAction(uuid, new Action(damage, protection))

            state.game = game.getState()
            state.isActionSended = true
        })

        builder.addCase(actions.finishRound.fulfilled, (state, action) => {
            const { uuid, damage, protection } = action.payload

            const game = Game.init(state.game)

            game.setAction(uuid, new Action(damage, protection))

            state.game = game.getState()
        })

        builder.addCase(actions.selectDefence, (state, action) => {
            const index = action.payload
            const value = state.selectedDefences[index]

            state.selectedDefences[index] = value === 1 ? 0 : 1
        })

        builder.addCase(actions.selectAttack, (state, action) => {
            const index = action.payload
            const value = state.selectedAttacks[index]

            state.selectedAttacks[index] = value === 1 ? 0 : 1
        })

        builder.addCase(actions.showQuitPopup, (state) => {
            state.isQuitPopupVisible = true
        })

        builder.addCase(actions.hideQuitPopup, (state) => {
            state.isQuitPopupVisible = false
        })
    }
})
