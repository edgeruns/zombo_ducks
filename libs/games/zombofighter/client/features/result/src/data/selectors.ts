import { createSelector } from '@reduxjs/toolkit'

import game from '@apps/games-zombofighter-client-data'

export const isPopupVisible = createSelector(
    [game.selectors.isGameFinishScene],
    (isGameFinishScene) => {
        return isGameFinishScene
    }
)

export const isVictory = createSelector(
    [game.selectors.isGameVictory],
    (isGameVictory) => {
        return isGameVictory
    }
)

export const isLose = createSelector(
    [game.selectors.isGameLose],
    (isGameLose) => {
        return isGameLose
    }
)

export const getPlayer = createSelector(
    [game.selectors.getPlayer],
    (player) => {
        return player
    }
)

export const getProfit = createSelector(
    [game.selectors.getGameProfit],
    (gameProfit) => {
        return gameProfit
    }
)
