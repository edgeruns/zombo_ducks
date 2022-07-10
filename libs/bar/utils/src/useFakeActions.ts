import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Actions,
    AppDispatch,
    BodyParts,
    ReceiveAction,
    UserSkins,
    actions,
    selectors
} from '@apps/bar/data'

export const useFakeActions = () => {
    const dispatch: AppDispatch = useDispatch()

    const player = useSelector(selectors.getRoundPlayer)
    const playerAttacks = useSelector(selectors.getPlayerAttacks)
    const playerDefences = useSelector(selectors.getPlayerDefences)
    const playerHealth = player?.health || 100

    const opponent = useSelector(selectors.getRoundOpponent)
    const opponentHealth = opponent?.health || 100

    const fakeSearch = useCallback(() => {
        dispatch(actions.startSearch())

        setTimeout(() => {
            const args: ReceiveAction = {
                type: Actions.GameStart,
                data: {
                    gameId: 1,
                    rounds: 5,
                    opponent: {
                        id: 2,
                        nickname: 'devdammit',
                        skin: UserSkins.Default,
                        avatar: '/assets/avatar.png',
                        statistics: {
                            allGames: 20,
                            wonGames: 15
                        }
                    }
                }
            }

            dispatch(actions.receiveAction(args))
        }, 3000)

        setTimeout(() => {
            const args: ReceiveAction = {
                type: Actions.RoundStart,
                data: {
                    time: 10,
                    player: {
                        health: 100
                    },
                    opponent: {
                        health: 100
                    }
                }
            }

            dispatch(actions.receiveAction(args))
        }, 4500)
    }, [dispatch])

    const fakeRoundFinish = useCallback(() => {
        const opponentAttacks = [BodyParts.Head, BodyParts.Torso]
        const opponentDefences = [BodyParts.Head, BodyParts.Torso]

        const playerDamaged = opponentAttacks.filter(part => !playerDefences.includes(part))
        const playerDamage = playerDamaged.length * - 10

        const opponentDamaged = playerAttacks.filter(part => !opponentDefences.includes(part))
        const opponentDamage = opponentDamaged.length * - 10

        const args: ReceiveAction = {
            type: Actions.RoundFinish,
            data: {
                player: {
                    health: playerHealth - playerDamage,
                    damage: playerDamage
                },
                opponent: {
                    health: opponentHealth - opponentDamage,
                    damage: opponentDamage,
                    attacks: opponentAttacks,
                    defences: opponentDefences
                }
            }
        }

        dispatch(actions.receiveAction(args))
    }, [dispatch, playerHealth, opponentHealth, playerAttacks, playerDefences])

    const fakeAttack = useCallback(() => {
        dispatch(actions.attack())
    }, [dispatch])

    return {
        fakeSearch,
        fakeRoundFinish,
        fakeAttack
    }
}
