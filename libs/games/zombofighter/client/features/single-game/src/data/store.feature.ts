import { configureStore } from '@reduxjs/toolkit'

import user from '@apps/games/zombofighter/client/features/shared/user'

import { slice } from './slice'

const store = configureStore({
    reducer: {
        [slice.name]: slice.reducer,
        [user.slice.name]: user.slice.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export type FeatureState = ReturnType<typeof store.getState>
export type FeatureDispatch = typeof store.dispatch
