import { createSlice } from '@reduxjs/toolkit'
import { auth, checkAuth } from './actions'

type State = {
    authorized: boolean
    checking: boolean
}

const initialState: State = {
    authorized: false,
    checking: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(auth.pending, (state) => {
            return state
        })
        builder.addCase(auth.fulfilled, (state) => {
            state.authorized = true
            return state
        })
        builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
            state.checking = false
            state.authorized = payload

            return state
        })
    },
})
