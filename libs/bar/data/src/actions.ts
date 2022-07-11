import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    Actions,
    AppState,
    SendAction,
    SendActionPayload,
    ReceiveAction,
    ReceiveActionPayload,
    UserSkins,
    User
} from './types'
import * as selectors from './selectors'

export const sendAction = createAsyncThunk<
    SendActionPayload,
    SendAction
>(
    'sendAction',
    async (args) => {
        console.log(`Send action ${args.type}:`, args.data)

        return {
            success: true
        }
    }
)

export const receiveAction = createAsyncThunk<
    ReceiveActionPayload,
    ReceiveAction
>(
    'receiveAction',
    async (args) => {
        console.log(`Receive action ${args.type}:`, args.data)
        return args
    }
)

export const getPlayer = createAsyncThunk<
    User,
    void
>(
    'getPlayer',
    async (_) => {
        return {
            id: 1,
            nickname: 'archi',
            skin: UserSkins.Default,
            avatar: '/assets/avatar.png',
            statistics: {
                allGames: 10,
                wonGames: 1
            }
        }
    }
)

export const startSearch = createAsyncThunk<
    void,
    void,
    { state: AppState }
>(
    'startSearch',
    async (_, { getState, dispatch }) => {
        const state = getState()
        const player = selectors.getPlayer(state)

        if (player) {
            const actionArgs: SendAction = {
                type: Actions.StartSearch,
                data: {
                    userId: player.id
                }
            }

            await dispatch(sendAction(actionArgs))
        }
    }
)

export const attack = createAsyncThunk<
    SendActionPayload,
    void,
    { state: AppState }
>(
    'attack',
    async (_, { getState, dispatch }) => {
        const state = getState()
        const player = selectors.getPlayer(state)
        const playerAttacks = selectors.getPlayerAttacks(state)
        const playerDefences = selectors.getPlayerDefences(state)
        const game = selectors.getGame(state)

        if (player && game) {
            const actionArgs: SendAction = {
                type: Actions.Attack,
                data: {
                    userId: player.id,
                    gameId: game.id,
                    attacks: playerAttacks,
                    defences: playerDefences
                }
            }

            return await dispatch(sendAction(actionArgs)).unwrap()
        }

        return {
            success: false
        }
    }
)

export const quitGame = createAsyncThunk<
    SendActionPayload,
    void,
    { state: AppState }
>(
    'quitGame',
    async (_, { dispatch, getState }) => {
        const state = getState()

        const game = selectors.getGame(state)
        const player = selectors.getPlayer(state)

        if (game && player) {
            const actionArgs: SendAction = {
                type: Actions.QuitGame,
                data: {
                    gameId: game.id,
                    userId: player.id
                }
            }

            return await dispatch(sendAction(actionArgs)).unwrap()
        }

        return {
            success: false
        }
    }
)

