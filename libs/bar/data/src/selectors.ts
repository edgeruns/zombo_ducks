import { createSelector } from '@reduxjs/toolkit'

import { AppState, GameResultType, Round, Scene, Mode, UserStatus } from './types'
import { MAX_ATTACK_COUNT, MAX_DEFENDE_COUNT } from './constants'

export const getMode = (appState: AppState) => appState.bar.mode
export const getScene = (appState: AppState) => appState.bar.scene
export const getPlayer = (appState: AppState) => appState.bar.player
export const getGame = (appState: AppState) => appState.bar.game
export const getOpponent = (appState: AppState) => appState.bar.game?.opponent
export const getRounds = (appState: AppState) => appState.bar.rounds
export const getRoundsCount = (appState: AppState) => appState.bar.game?.rounds || 0
export const getTimeLeft = (appState: AppState) => appState.bar.timeLeft
export const getGameResult = (appState: AppState) => appState.bar.game?.result
export const isRoundStarted = (appState: AppState) => appState.bar.roundStarted
export const isAttacked = (appState: AppState) => appState.bar.attacked
export const isQuitPopupOpened = (appState: AppState) => appState.bar.quitPopupOpened

export const isTutorialMode = createSelector(
    [getMode],
    (mode) => mode === Mode.Tutorial
)

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

export const getRoundsNum = createSelector(
    [getRounds, isGameStartScene],
    (rounds, isGameStart) => isGameStart ? 1 : rounds.length
)

export const getRoundTimeLeft = createSelector(
    [getTimeLeft, isGameStartScene],
    (timeLeft, isGameStart) => isGameStart ? 10 : timeLeft
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
    [isAttacked, isRoundTimeExpired, isRoundFinishScene, isGameStartScene],
    (attacked, isTimeExpired, isFinishScene, isGameStart) => {
        return attacked || isTimeExpired || isFinishScene || isGameStart
    }
)

export const isAttackDisabled = createSelector(
    [isAttacked, isRoundTimeExpired, isRoundFinishScene, isGameStartScene],
    (attacked, isTimeExpired, isFinishScene, isGameStart) => {
        return attacked || isTimeExpired || isFinishScene || isGameStart
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

export const isRoundVictory = createSelector(
    [isRoundFinishScene, getPlayerDamage, getOpponentDamage],
    (isRoundFinish, playerDamage, opponentDamage) => {
        return isRoundFinish && playerDamage > opponentDamage
    }
)

export const isRoundLose = createSelector(
    [isRoundFinishScene, getPlayerDamage, getOpponentDamage],
    (isRoundFinish, playerDamage, opponentDamage) => {
        return isRoundFinish && playerDamage < opponentDamage
    }
)

export const isGameVictory = createSelector(
    [getGameResult],
    (result) => {
        return result?.type === GameResultType.Victory
    }
)

export const isGameLose = createSelector(
    [getGameResult],
    (result) => {
        return result?.type === GameResultType.Lose
    }
)
