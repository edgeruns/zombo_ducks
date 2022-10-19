import { configureStore } from '@reduxjs/toolkit'

import sounds from '@apps/games/zombofighter/client/features/shared/sounds'

const store = configureStore({
    reducer: {
        [sounds.slice.name]: sounds.slice.reducer
    }
})

export type FeatureState = ReturnType<typeof store.getState>
export type FeatureDispatch = typeof store.dispatch
