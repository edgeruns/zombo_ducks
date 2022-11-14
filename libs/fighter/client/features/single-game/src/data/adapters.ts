import { createEntityAdapter } from '@reduxjs/toolkit'

import { FeatureState } from './store.feature'
import { Player } from './types'

export const playersAdapter = createEntityAdapter<Player>()
export const playersSelectors = playersAdapter.getSelectors<FeatureState>(
    (state) => state.singleGame.players
)
