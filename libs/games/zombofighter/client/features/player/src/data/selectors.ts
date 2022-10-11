import { createSelector } from '@reduxjs/toolkit'

import game, { UserSkins } from '@apps/games-zombofighter-client-data'

export const isVisible = createSelector(
    [game.selectors.getPlayer],
    (player) => {
        return !!player
    }
)

export const isTurned = createSelector(
    [
        game.selectors.isTutorialMode,
        game.selectors.isGameStartScene,
        game.selectors.isRoundScene,
        game.selectors.isRoundFinishScene
    ],
    (isTutorialMode, isGameStartScene, isRoundScene, isRoundFinishScene) => {
        return (
            isTutorialMode ||
            isGameStartScene ||
            isRoundScene ||
            isRoundFinishScene
        )
    }
)

export const getSkin = createSelector(
    [game.selectors.getPlayer],
    (player) => {
        return player?.skin ?? UserSkins.Default
    }
)

export const getStatus = createSelector(
    [game.selectors.getPlayerStatus],
    (status) => {
        return status
    }
)
