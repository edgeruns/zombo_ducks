import { createSelector } from '@reduxjs/toolkit'

import game from '@apps/games-zombofighter-client-data'

export const isVisible = createSelector(
    [
        game.selectors.isTutorialMode,
        game.selectors.isRoundScene,
        game.selectors.isRoundFinishScene
    ],
    (isTutorialMode, isRoundScene, isRoundFinishScene) => {
        return isTutorialMode && (isRoundScene || isRoundFinishScene)
    }
)

export const isHintVisible = createSelector(
    [game.selectors.isRoundScene],
    (isRoundScene) => {
        return !isRoundScene
    }
)

export const isRoundTimeExpired = createSelector(
    [game.selectors.isRoundTimeExpired],
    (isRoundTimeExpired) => {
        return isRoundTimeExpired
    }
)

export const isPopupVisible = createSelector(
    [
        game.selectors.isTutorialMode,
        game.selectors.isStartScene,
    ],
    (isTutorialMode, isStartScene) => {
        return isTutorialMode && isStartScene
    }
)
