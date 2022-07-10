import { createAsyncThunk } from '@reduxjs/toolkit'

import {
    Actions,
    AppState,
    SendAction,
    ReceiveAction,
    ReceiveActionPayload,
    UserSkins,
    User
} from './types'
import * as selectors from './selectors'

export const sendAction = createAsyncThunk<
    void,
    SendAction
>(
    'sendAction',
    async (args) => {
        console.log(`Send action ${args.type}:`, args.data)
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
    void,
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

            await dispatch(sendAction(actionArgs))
        }
    }
)
