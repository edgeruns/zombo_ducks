import { createSelector } from '@reduxjs/toolkit'

import { FeatureState } from './feature.store'

export const getBalance = createSelector(
    (state: FeatureState) => state.web3,
    (web3) => {
        if (web3.player) {
            return web3.player.deposit
        }

        return 0
    }
)
