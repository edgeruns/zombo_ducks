import { createEntityAdapter } from '@reduxjs/toolkit'

import { Player } from './types'
import { FeatureState } from './store.feature'

export const playersAdapter = createEntityAdapter<Player>()
export const playersSelectors = playersAdapter.getSelectors<FeatureState>(state => state.singleGame.players)
