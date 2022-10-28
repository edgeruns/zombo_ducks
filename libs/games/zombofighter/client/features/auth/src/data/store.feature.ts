import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { web3Slice } from '@apps/games/zombofighter/client/features/shared/web3'
import { configureStore } from '@reduxjs/toolkit'

import { authSlice } from './slice'

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [web3Slice.name]: web3Slice.reducer,
    },
})

export type FeatureState = ReturnType<typeof store.getState>
export type FeatureDispatch = typeof store.dispatch
export const useFeatDispatch: () => FeatureDispatch = useDispatch
export const useFeatSelector: TypedUseSelectorHook<FeatureState> = useSelector
