import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { Game } from '@apps/games/zombofighter/domain'

import { InitPayload, FinishRoundArgs, ActionPayload, SelectAttackPayload, SelectDefencePayload } from './types'
import { FeatureState } from './store.feature'
import * as selectors from './selectors'

export const init = createAction<InitPayload>('singleGame/init')
export const startRound = createAction('singleGame/startRound')

export const waitStart = createAsyncThunk<
    void,
    void,
    { state: FeatureState }
>(
    'singleGame/waitStart',
    async (_, { dispatch, getState }) => {
        const state = getState()
        const game = Game.init(state.singleGame.game)

        await game.waitStartPlayers()

        dispatch(startRound())
    }
)

export const waitNextRound = createAsyncThunk<
    void,
    void,
    { state: FeatureState }
>(
    'singleGame/waitNextRound',
    async (_, { dispatch, getState }) => {
        const state = getState()
        const game = Game.init(state.singleGame.game)

        await game.waitNextRound()

        dispatch(startRound())
    }
)

export const sendAction = createAsyncThunk<
    ActionPayload,
    void,
    { state: FeatureState }
>(
    'singleGame/sendAction',
    async (_, { getState }) => {
        const state = getState()
        const user = state.user.user
        const attacks = state.singleGame.selectedAttacks
        const defences = state.singleGame.selectedDefences

        if (!user) {
            throw new Error('I dont know who are you')
        }

        return {
            uuid: user.id,
            damage: attacks,
            protection: defences
        }
    }
)

export const finishRound = createAsyncThunk<
    ActionPayload,
    FinishRoundArgs,
    { state: FeatureState }
>(
    'singleGame/finishRound',
    async (args, { getState }) => {
        const state = getState()
        const enemy = selectors.getEnemy(state)

        if (!enemy) {
            throw new Error('Enemy not found')
        }

        return {
            uuid: enemy.id,
            ...args.enemyAction
        }
    }
)

export const selectAttack = createAction<SelectAttackPayload>('singleGame/selectAttack')
export const selectDefence = createAction<SelectDefencePayload>('singleGame/selectDefence')

export const showQuitPopup = createAction('singleGame/showQuitPopup')
export const hideQuitPopup = createAction('singleGame/hideQuitPopup')

export const quit = createAsyncThunk<
    void,
    void
>(
    'singleGame/quit',
    async () => {
        console.log('Quit')
    }
)
