import user, { UserSkins } from '@apps/fighter/client/features/shared/user'
import { Game } from '@apps/fighter/domain'
import { createSelector } from '@reduxjs/toolkit'

import { playersSelectors } from './adapters'
import { FeatureState } from './store.feature'

export const getGame = (state: FeatureState) => Game.init(state.singleGame.game)

export const getGamePlayer = createSelector(
    [getGame, user.selectors.getUser],
    (game, user) => {
        if (!user) {
            return null
        }

        return game.players.get(user.id)
    }
)

export const getGameEnemy = createSelector(
    [getGame, getGamePlayer],
    (game, player) => {
        if (!player) {
            return null
        }

        const playersIds = [...game.players.keys()]
        const enemyId = playersIds.find((id) => id !== player.uuid)

        if (!enemyId) {
            return null
        }

        return game.players.get(enemyId)
    }
)

export const getPlayer = createSelector(
    [getGame, getGamePlayer, playersSelectors.selectAll],
    (game, gamePlayer, players) => {
        if (!gamePlayer) {
            return null
        }

        const player = players.find((player) => player.id === gamePlayer?.uuid)

        if (!player) {
            return null
        }

        return {
            id: player.id,
            nickname: player.nickname,
            skin: UserSkins.Default,
            avatar: player.avatar,
            health: game.getHealth(player.id),
            statistics: gamePlayer.statistic,
        }
    }
)

export const getEnemy = createSelector(
    [getGame, getGameEnemy, playersSelectors.selectAll],
    (game, gameEnemy, players) => {
        if (!gameEnemy) {
            return null
        }

        const player = players.find((player) => player.id === gameEnemy?.uuid)

        if (!player) {
            return null
        }

        return {
            id: player.id,
            nickname: player.nickname,
            skin: UserSkins.Default,
            avatar: player.avatar,
            health: game.getHealth(player.id),
            statistics: gameEnemy.statistic,
        }
    }
)

export const getRounds = createSelector([getGame], (game) => {
    return game.rounds
})

export const getLastRound = createSelector([getRounds], (rounds) => {
    return rounds[rounds.length - 1]
})

export const isGameStart = createSelector([getGame], (game) => {
    return game.rounds.length === 0
})

export const isActionSended = (state: FeatureState) =>
    state.singleGame.isActionSended

export const getPlayerAttacks = (state: FeatureState) =>
    state.singleGame.selectedAttacks
export const getPlayerDefences = (state: FeatureState) =>
    state.singleGame.selectedDefences

export const getEnemyAction = createSelector(
    [getEnemy, getLastRound],
    (enemy, lastRound) => {
        if (!enemy || !lastRound) {
            return undefined
        }

        return lastRound.actions.get(enemy.id)
    }
)

export const getEnemyAttacks = createSelector([getEnemyAction], (action) => {
    if (!action) {
        return [0, 0, 0]
    }

    return action.damage
})

export const getEnemyDefences = createSelector([getEnemyAction], (action) => {
    if (!action) {
        return [0, 0, 0]
    }

    return action.protection
})

export const isQuitPopupVisible = (state: FeatureState) =>
    state.singleGame.isQuitPopupVisible
