import { createSelector } from '@reduxjs/toolkit'

import { FeatureState } from './store.feature'

export const getProfit = (state: FeatureState) => state.result.profit

export const isVictory = createSelector(
    [getProfit],
    (profit) => {
        return profit > 0
    }
)

export const isDraws = createSelector(
    [getProfit],
    (profit) => {
        return profit === 0
    }
)

export const isLose = createSelector(
    [getProfit],
    (profit) => {
        return profit < 0
    }
)
