import sounds from '@apps/fighter/client/features/shared/sounds'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        [sounds.slice.name]: sounds.slice.reducer,
    },
})

export type FeatureState = ReturnType<typeof store.getState>
export type FeatureDispatch = typeof store.dispatch
