import { createSelector } from '@reduxjs/toolkit'

import game, { UserSkins } from '@apps/games-zombofighter-client-data'

export const isVisible = createSelector(
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

export const isArrived = createSelector(
    [game.selectors.isGameStartScene],
    (isGameStartScene) => {
        return isGameStartScene
    }
)

export const getSkin = createSelector(
    [game.selectors.getOpponent],
    (opponent) => {
        return opponent?.skin ?? UserSkins.Default
    }
)

export const getStatus = createSelector(
    [game.selectors.getOpponentStatus],
    (status) => {
        return status
    }
)
