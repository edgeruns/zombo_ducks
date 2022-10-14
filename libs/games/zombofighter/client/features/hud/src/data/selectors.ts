import { createSelector } from '@reduxjs/toolkit'

import game, { BodyParts } from '@apps/games-zombofighter-client-data'

export const isMenuVisible = createSelector(
    [game.selectors.isStartScene],
    (isStartScene) => {
        return isStartScene
    }
)

export const isActionButtonVisible = createSelector(
    [
        game.selectors.isAttacked,
        game.selectors.isRoundScene,
        game.selectors.getPlayerAttacks,
        game.selectors.getPlayerDefences
    ],
    (isAttacked, isRoundScene, playerAttacks, playerDefences) => {
        return (
            !isAttacked &&
            isRoundScene &&
            (playerAttacks.length > 0 || playerDefences.length > 0)
        )
    }
)

export const isActionButtonDisabled = createSelector(
    [game.selectors.isAttacked],
    (isAttacked) => {
        return isAttacked
    }
)

export const isSearchingVisible = createSelector(
    [game.selectors.isSearchingScene],
    (isSearchingScene) => {
        return isSearchingScene
    }
)

export const isHeaderVisible = createSelector(
    [
        game.selectors.isGameStartScene,
        game.selectors.isRoundScene,
        game.selectors.isRoundFinishScene
    ],
    (isGameStartScene, isRoundScene, isRoundFinishScene) => {
        return (
            isGameStartScene ||
            isRoundScene ||
            isRoundFinishScene
        )
    }
)

export const isHeaderCanQuit = createSelector(
    [game.selectors.isTutorialMode],
    (isTutorialMode) => {
        return !isTutorialMode
    }
)

export const getHeaderPlayer = createSelector(
    [game.selectors.getPlayer, game.selectors.getPlayerHealth],
    (player, health) => {
        if (!player) {
            return null
        }

        return {
            ...player,
            health
        }
    }
)

export const getHeaderOpponent = createSelector(
    [game.selectors.getOpponent, game.selectors.getOpponentHealth],
    (opponent, health) => {
        if (!opponent) {
            return null
        }

        return {
            ...opponent,
            health
        }
    }
)

export const isRoundsVisible = createSelector(
    [
        game.selectors.isGameStartScene,
        game.selectors.isRoundScene,
        game.selectors.isRoundFinishScene
    ],
    (isGameStartScene, isRoundScene, isRoundFinishScene) => {
        return isGameStartScene || isRoundScene || isRoundFinishScene
    }
)

export const isRoundsWatchBlinking = createSelector(
    [game.selectors.getTimeLeft],
    (timeLeft) => {
        return timeLeft <= 3 && timeLeft >= 1
    }
)

export const isRoundsWatchExpired = createSelector(
    [game.selectors.getTimeLeft],
    (timeLeft) => {
        return timeLeft <= 3
    }
)

export const isRoundsStartTimer = createSelector(
    [
        game.selectors.isRoundStarted,
        game.selectors.getRoundsNum,
        game.selectors.getRoundsCount,
    ],
    (isRoundStarted, current, count) => {
        return isRoundStarted && current > 0 && current <= count
    }
)

export const isRoundsStopTimer = createSelector(
    [
        game.selectors.isRoundTimeExpired,
        game.selectors.isRoundFinishScene,
        game.selectors.isGameFinishScene,
    ],
    (isRoundTimeExpired, isRoundFinishScene, isGameFinishScene) => {
        return isRoundTimeExpired || isRoundFinishScene || isGameFinishScene
    }
)

export const getRoundsTimeLeft = createSelector(
    [game.selectors.getTimeLeft],
    (timeLeft) => {
        return timeLeft
    }
)

export const getRoundsCurrent = createSelector(
    [game.selectors.getRoundsNum],
    (current) => {
        return current
    }
)

export const getRoundsCount = createSelector(
    [game.selectors.getRoundsCount],
    (count) => {
        return count
    }
)

export const isBodyPartsCheckboxVisible = createSelector(
    [
        game.selectors.isGameStartScene,
        game.selectors.isRoundScene,
        game.selectors.isRoundFinishScene
    ],
    (isGameStartScene, isRoundScene, isRoundFinishScene) => {
        return isGameStartScene || isRoundScene || isRoundFinishScene
    }
)

export const getBodyPartsCheckboxSelectedCount = createSelector(
    [game.selectors.getPlayerAttacks, game.selectors.getPlayerDefences],
    (playerAttacks, playerDefences) => {
        return playerAttacks.length + playerDefences.length
    }
)

export const isDefendVisible = createSelector(
    [
        game.selectors.isGameStartScene,
        game.selectors.isRoundScene,
        game.selectors.isRoundFinishScene
    ],
    (isGameStartScene, isRoundScene, isRoundFinishScene) => {
        return isGameStartScene || isRoundScene || isRoundFinishScene
    }
)

export const isDefendIconVisible = createSelector(
    [
        game.selectors.isGameStartScene,
        game.selectors.isRoundFinishScene
    ],
    (isGameStartScene, isRoundFinishScene) => {
        return isGameStartScene || isRoundFinishScene
    }
)

export const getDefendSelectedParts = createSelector(
    [game.selectors.getPlayerDefences],
    (playerDefences) => {
        return playerDefences
    }
)

export const getDefendDefendedParts = createSelector(
    [game.selectors.getPlayerDefendedParts],
    (playerDefended) => {
        return playerDefended
    }
)

export const getDefendDamagedParts = createSelector(
    [game.selectors.getPlayerDamagedParts],
    (playerDamaged) => {
        return playerDamaged
    }
)

export const getDefendDisabledParts = createSelector(
    [
        game.selectors.isDefendDisabled,
        game.selectors.isMaxDefences,
        getDefendSelectedParts
    ],
    (isDefendDisabled, isMaxDefences, selectedParts) => {
        const parts = Object.values(BodyParts)

        const isDisabled = (part: BodyParts) => {
            return isDefendDisabled || (isMaxDefences && !selectedParts.includes(part))
        }

        return parts.filter(isDisabled)
    }
)

export const getDefendDarkedParts = createSelector(
    [
        getDefendDisabledParts,
        game.selectors.isRoundScene
    ],
    (disabledParts, isRoundScene) => {
        const parts = Object.values(BodyParts)

        const isDarked = (part: BodyParts) => {
            return disabledParts.includes(part) && isRoundScene
        }

        return parts.filter(isDarked)
    }
)

export const isAttackVisible = createSelector(
    [
        game.selectors.isGameStartScene,
        game.selectors.isRoundScene,
        game.selectors.isRoundFinishScene
    ],
    (isGameStartScene, isRoundScene, isRoundFinishScene) => {
        return isGameStartScene || isRoundScene || isRoundFinishScene
    }
)

export const isAttackIconVisible = createSelector(
    [
        game.selectors.isGameStartScene,
        game.selectors.isRoundFinishScene
    ],
    (isGameStartScene, isRoundFinishScene) => {
        return isGameStartScene || isRoundFinishScene
    }
)

export const getAttackSelectedParts = createSelector(
    [game.selectors.getPlayerAttacks],
    (playerAttacks) => {
        return playerAttacks
    }
)

export const getAttackDefendedParts = createSelector(
    [game.selectors.getOpponentDefendedParts],
    (opponentDefended) => {
        return opponentDefended
    }
)

export const getAttackDamagedParts = createSelector(
    [game.selectors.getOpponentDamagedParts],
    (opponentDamaged) => {
        return opponentDamaged
    }
)

export const getAttackDisabledParts = createSelector(
    [
        game.selectors.isAttackDisabled,
        game.selectors.isMaxAttacks,
        getAttackSelectedParts
    ],
    (isAttackDisabled, isMaxAttacks, selectedParts) => {
        const parts = Object.values(BodyParts)

        const isDisabled = (part: BodyParts) => {
            return isAttackDisabled || (isMaxAttacks && !selectedParts.includes(part))
        }

        return parts.filter(isDisabled)
    }
)

export const getAttackDarkedParts = createSelector(
    [
        getAttackDisabledParts,
        game.selectors.isRoundScene
    ],
    (disabledParts, isRoundScene) => {
        const parts = Object.values(BodyParts)

        const isDarked = (part: BodyParts) => {
            return disabledParts.includes(part) && isRoundScene
        }

        return parts.filter(isDarked)
    }
)

export const isDamagesVisible = createSelector(
    [game.selectors.isRoundFinishScene],
    (isRoundFinishScene) => {
        return isRoundFinishScene
    }
)

export const getDamagesValues = createSelector(
    [
        game.selectors.getOpponentDamage,
        game.selectors.getPlayerDamage
    ],
    (opponentDamage, playerDamage) => {
        return [opponentDamage, playerDamage] as [number, number]
    }
)

export const isRoundGreetingShow = createSelector(
    [game.selectors.isRoundScene],
    (isRoundScene) => {
        return isRoundScene
    }
)

export const getRoundGreetingNum = createSelector(
    [game.selectors.getRoundsNum],
    (roundsNum) => {
        return roundsNum
    }
)

export const isQuitPopupVisible = createSelector(
    [game.selectors.isQuitPopupOpened],
    (isQuitPopupOpened) => {
        return isQuitPopupOpened
    }
)
