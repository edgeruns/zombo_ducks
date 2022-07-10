import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Actions, BodyParts, Round, Scene, State} from './types'
import * as actions from './actions'
import * as selectors from './selectors'

const initialState: State = {
    scene: Scene.Start,
    player: null,
    game: null,
    timeLeft: -1,
    rounds: []
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
        }
    },
    extraReducers: builder => {
        builder.addCase(actions.getPlayer.fulfilled, (state, action) => {
            state.player = action.payload

            return state
        })

        builder.addCase(actions.startSearch.fulfilled, (state) => {
            state.scene = Scene.Searching

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
                        opponent: data.opponent
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
                    }

                    state.scene = Scene.RoundFinish

                    break
                }
            }

            return state
        })
    }
})
