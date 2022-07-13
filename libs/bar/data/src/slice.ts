import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Actions, BodyParts, Round, Scene, Mode, State } from './types'
import * as actions from './actions'
import * as selectors from './selectors'

const initialState: State = {
    mode: Mode.Game,
    scene: Scene.Start,
    player: null,
    game: null,
    rounds: [],
    timeLeft: -1,
    attacked: false,
    quitPopupOpened: false
}

export const slice = createSlice({
    name: 'bar',
    initialState,
    reducers: {
        setTimeLeft(state, action: PayloadAction<number>) {
            state.timeLeft = action.payload

            return state
        },

        attack(state, action: PayloadAction<BodyParts>) {
            const appState = { bar: state }

            const round = selectors.getCurrentRound(appState)

            if (round) {
                const part = action.payload
                const attacks = round.player.attacks
                const partIndex = attacks.indexOf(part)

                if (partIndex !== -1) {
                    attacks.splice(partIndex, 1)
                } else {
                    attacks.push(part)
                }
            }

            return state
        },

        defend(state, action: PayloadAction<BodyParts>) {
            const appState = { bar: state }

            const round = selectors.getCurrentRound(appState)

            if (round) {
                const part = action.payload
                const defences = round.player.defences
                const partIndex = defences.indexOf(part)

                if (partIndex !== -1) {
                    defences.splice(partIndex, 1)
                } else {
                    defences.push(part)
                }
            }

            return state
        },

        reset(state) {
            state.scene = Scene.Start
            state.game = null
            state.rounds = []
            state.timeLeft = -1
            state.attacked = false

            return state
        },

        setQuitPopupOpened(state, action: PayloadAction<boolean>) {
            state.quitPopupOpened = action.payload

            return state
        },

        setMode(state, action: PayloadAction<Mode>) {
            state.mode = action.payload

            return state
        }
    },
    extraReducers: builder => {
        builder.addCase(actions.getPlayer.fulfilled, (state, action) => {
            state.player = action.payload

            return state
        })

        builder.addCase(actions.startSearch.fulfilled, (state) => {
            state.scene = Scene.Searching
            state.game = null
            state.rounds = []
            state.timeLeft = -1
            state.attacked = false

            return state
        })

        builder.addCase(actions.sendAction.fulfilled, (state, action) => {
            const { success } = action.payload
            const { arg } = action.meta

            if (success) {
                switch (arg.type) {
                    case Actions.Attack: {
                        state.attacked = true

                        break
                    }

                    case Actions.QuitGame: {
                        state.quitPopupOpened = false

                        break
                    }
                }
            }

            return state
        })

        builder.addCase(actions.receiveAction.fulfilled, (state, action) => {
            const { type, data } = action.payload

            const appState = { bar: state }

            switch (type) {
                case Actions.GameStart: {
                    state.game = {
                        id: data.gameId,
                        rounds: data.rounds,
                        opponent: data.opponent,
                        result: null
                    }

                    state.scene = Scene.GameStart

                    break
                }

                case Actions.RoundStart: {
                    const newRound: Round = {
                        time: data.time,
                        player: {
                            health: data.player.health,
                            damage: 0,
                            attacks: [],
                            defences: []
                        },
                        opponent: {
                            health: data.opponent.health,
                            damage: 0,
                            attacks: [],
                            defences: []
                        }
                    }

                    state.scene = Scene.Round
                    state.timeLeft = data.time
                    state.attacked = false
                    state.rounds = [...state.rounds, newRound]

                    break
                }

                case Actions.RoundFinish: {
                    const round = selectors.getCurrentRound(appState)

                    if (round) {
                        round.opponent.health = data.opponent.health
                        round.opponent.damage = data.opponent.damage
                        round.opponent.attacks = [...data.opponent.attacks]
                        round.opponent.defences = [...data.opponent.defences]

                        round.player.health = data.player.health
                        round.player.damage = data.player.damage

                        state.scene = Scene.RoundFinish
                    }

                    break
                }

                case Actions.GameFinish: {
                    if (state.player && state.game) {
                        state.player.statistics = {
                            ...data.statistics
                        }

                        state.game.result = {
                            type: data.type,
                            profit: data.profit
                        }

                        state.scene = Scene.GameFinish
                    }

                    break
                }
            }

            return state
        })
    }
})
