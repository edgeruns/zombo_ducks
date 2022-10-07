import { configureStore } from '@reduxjs/toolkit'

import { slice } from './slice'



export const store = configureStore({
    reducer: {
        [slice.name]: slice.reducer,
    },
})

export type AppStore = typeof store
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch
