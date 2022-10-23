import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { authSlice } from './slice'

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
    },
})

export type FeatureState = ReturnType<typeof store.getState>
export type FeatureDispatch = typeof store.dispatch
export const useFeatDispatch: () => FeatureDispatch = useDispatch
export const useFeatSelector: TypedUseSelectorHook<FeatureState> = useSelector
