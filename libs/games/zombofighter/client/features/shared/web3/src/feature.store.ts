import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import { web3Slice } from './slice'

const store = configureStore({
    reducer: {
        [web3Slice.name]: web3Slice.reducer,
    },
})

export type FeatureState = ReturnType<typeof store.getState>
export type FeatureDispatch = typeof store.dispatch
export const useFeatDispatch: () => FeatureDispatch = useDispatch
export const useFeatSelector: TypedUseSelectorHook<FeatureState> = useSelector
