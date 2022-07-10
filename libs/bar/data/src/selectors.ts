import {createSelector} from '@reduxjs/toolkit'

import {AppState, GameResultType, Round, Scene, UserStatus} from './types'
import {MAX_ATTACK_COUNT, MAX_DEFENDE_COUNT} from './constants'

export const getScene = (appState: AppState) => appState.bar.scene
export const getPlayer = (appState: AppState) => appState.bar.player
export const getGame = (appState: AppState) => appState.bar.game
export const getOpponent = (appState: AppState) => appState.bar.game?.opponent
export const getRounds = (appState: AppState) => appState.bar.rounds
export const getRoundsNum = (appState: AppState) => appState.bar.rounds.length
export const getRoundsCount = (appState: AppState) => appState.bar.game?.rounds || 0
export const getRoundTimeLeft = (appState: AppState) => appState.bar.timeLeft
export const getGameResult = (appState: AppState) => appState.bar.game?.result
export const isAttacked = (appState: AppState) => appState.bar.attacked

export const isStartScene = createSelector(
    [getScene],
    (scene) => scene === Scene.Start
)

export const isSearchingScene = createSelector(
    [getScene],
    (scene) => scene === Scene.Searching
)

export const isGameStartScene = createSelector(
    [getScene],
    (scene) => scene === Scene.GameStart
)

export const isRoundScene = createSelector(
    [getScene],
    (scene) => scene === Scene.Round
)

export const isRoundFinishScene = createSelector(
    [getScene],
    (scene) => scene === Scene.RoundFinish
)

export const isGameFinishScene = createSelector(
    [getScene],
    (scene) => scene === Scene.GameFinish
)

export const getCurrentRound = createSelector(
    [getRounds],
    (rounds) => rounds[rounds.length - 1] as Round | undefined
)

export const getRoundPlayer = createSelector(
    [getPlayer, getCurrentRound],
    (player, round) => {
        if (!player || !round) {
            return undefined
        }

        return {
            nickname: player.nickname,
            avatar: player.avatar,
            health: round.player.health,
            games: {
                won: player.statistics.wonGames,
                all: player.statistics.allGames
            }
        }
    }
)

export const getPlayerHealth = createSelector(
    [getRoundPlayer],
    (player) => {
        return Math.max(player?.health ?? 100, 0)
    }
)

export const getRoundOpponent = createSelector(
    [getOpponent, getCurrentRound],
    (opponent, round) => {
        if (!opponent || !round) {
            return undefined
        }

        return {
            nickname: opponent.nickname,
            avatar: opponent.avatar,
            health: round.opponent.health,
            games: {
                won: opponent.statistics.wonGames,
                all: opponent.statistics.allGames
            }
        }
    }
)

export const getOpponentHealth = createSelector(
    [getRoundOpponent],
    (opponent) => {
        return Math.max(opponent?.health ?? 100, 0)
    }
)

export const isRoundTimeExpired = createSelector(
    [getRoundTimeLeft],
    (timeLeft) => timeLeft === 0
)

export const getPlayerDefences = createSelector(
    [getCurrentRound],
    (round) => round?.player.defences ?? []
)

export const getOpponentDefences = createSelector(
    [getCurrentRound],
    (round) => round?.opponent.defences ?? []
)

export const getPlayerAttacks = createSelector(
    [getCurrentRound],
    (round) => round?.player.attacks ?? []
)

export const getOpponentAttacks = createSelector(
    [getCurrentRound],
    (round) => round?.opponent.attacks ?? []
)

export const getPlayerDefendedParts = createSelector(
    [getPlayerDefences, getOpponentAttacks],
    (defences, attacks) => {
        return attacks.filter(part => defences.includes(part))
    }
)

export const getOpponentDefendedParts = createSelector(
    [getOpponentDefences, getPlayerAttacks],
    (defences, attacks) => {
        return attacks.filter(part => defences.includes(part))
    }
)

export const getPlayerDamagedParts = createSelector(
    [getPlayerDefendedParts, getOpponentAttacks],
    (defended, attacks) => {
        return attacks.filter(part => !defended.includes(part))
    }
)

export const getOpponentDamagedParts = createSelector(
    [getOpponentDefendedParts, getPlayerAttacks],
    (defended, attacks) => {
        return attacks.filter(part => !defended.includes(part))
    }
)

export const getPlayerDamage = createSelector(
    [getCurrentRound],
    (round) => round?.player.damage || 0
)

export const getOpponentDamage = createSelector(
    [getCurrentRound],
    (round) => round?.opponent.damage || 0
)

export const getPlayerStatus = createSelector(
    [getPlayerDamage, getGameResult, isRoundFinishScene, isGameFinishScene],
    (damage, gameResult, isRoundFinish, isGameFinish) => {
        if (isGameFinish && gameResult) {
            return gameResult.type === GameResultType.Victory ? UserStatus.Victory : UserStatus.Lose
        }

        if (isRoundFinish) {
            return damage === 0 ? UserStatus.Victory : UserStatus.Lose
        }

        return UserStatus.Normal
    }
)

export const getOpponentStatus = createSelector(
    [getOpponentDamage, isRoundFinishScene],
    (damage, isRoundFinish) => {
        if (isRoundFinish) {
            return damage === 0 ? UserStatus.Victory : UserStatus.Lose
        }

        return UserStatus.Normal
    }
)

export const isDefendDisabled = createSelector(
    [isAttacked, isRoundTimeExpired, isRoundFinishScene],
    (attacked, isTimeExpired, isFinishScene) => {
        return attacked || isTimeExpired || isFinishScene
    }
)

export const isAttackDisabled = createSelector(
    [isAttacked, isRoundTimeExpired, isRoundFinishScene],
    (attacked, isTimeExpired, isFinishScene) => {
        return attacked || isTimeExpired || isFinishScene
    }
)

export const isMaxDefences = createSelector(
    [getPlayerDefences],
    (defences) => defences.length === MAX_DEFENDE_COUNT
)

export const isMaxAttacks = createSelector(
    [getPlayerAttacks],
    (attacks) => attacks.length === MAX_ATTACK_COUNT
)

export const getGameProfit = createSelector(
    [getGameResult],
    (result) => result?.profit ?? 0
)

export const isVictory = createSelector(
    [getGameResult],
    (result) => {
        return result?.type === GameResultType.Victory
    }
)

export const isLose = createSelector(
    [getGameResult],
    (result) => {
        return result?.type === GameResultType.Lose
    }
)
