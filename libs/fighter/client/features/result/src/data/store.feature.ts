import { configureStore } from '@reduxjs/toolkit'

import { slice } from './slice'

const store = configureStore({
    reducer: {
        [slice.name]: slice.reducer,
    },
})

export type FeatureState = ReturnType<typeof store.getState>
export type FeatureDispatch = typeof store.dispatch
