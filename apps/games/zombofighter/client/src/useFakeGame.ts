import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'

import { Game, Player } from '@apps/games/zombofighter/domain'
import searchGame from '@apps/games/zombofighter/client/features/search-game'
import singleGame, { BodyParts } from '@apps/games/zombofighter/client/features/single-game'

import { AppDispatch } from './store'

export function useFakeGame() {
    const dispatch = useDispatch<AppDispatch>()

    const isActionSended = useSelector(singleGame.selectors.isActionSended)

    const location = useLocation()

    // Ловим переход на страницу поиска и подсосываем id игры
    useEffect(() => {
        if (location.pathname === '/game/search') {
            setTimeout(() => {
                dispatch(searchGame.actions.found({ gameId: '1' }))
            }, 2000)
        }
    }, [dispatch, location])

    // Ловим переход на страницу игры и выдаем фейковую игру
    useEffect(() => {
        if (location.pathname === '/game/1') {
            setTimeout(() => {
                const game = new Game()
                const player = new Player('1', { wins: 20, loses: 10, draws: 1 })
                const enemy = new Player('2', { wins: 20, loses: 10, draws: 1 })

                game.uuid = '1'
                game.players.set(player.uuid, player)
                game.players.set(enemy.uuid, enemy)

                const initData = {
                    gameState: game.getState(),
                    players: [
                        {
                            id: '1',
                            nickname: 'archi',
                            avatar: '/assets/avatar.png'
                        },

                        {
                            id: '2',
                            nickname: 'devdammit',
                            avatar: '/assets/avatar.png'
                        }
                    ]
                }

                dispatch(singleGame.actions.init(initData))
                dispatch(singleGame.actions.waitStart())
            }, 1000)
        }
    }, [dispatch, location.pathname])

    useEffect(() => {
        if (isActionSended) {
            const enemyAction = {
                damage: [0, 1, 0] as BodyParts,
                protection: [0, 1, 1] as BodyParts
            }

            dispatch(singleGame.actions.finishRound({ enemyAction }))
            dispatch(singleGame.actions.waitNextRound())
        }
    }, [dispatch, isActionSended])
}
