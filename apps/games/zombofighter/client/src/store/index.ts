import { authSlice } from '@apps/games/zombofighter/client/features/auth'
import result from '@apps/games/zombofighter/client/features/result'
import searchGame from '@apps/games/zombofighter/client/features/search-game'
import sounds from '@apps/games/zombofighter/client/features/shared/sounds'
import user from '@apps/games/zombofighter/client/features/shared/user'
import { web3Slice } from '@apps/games/zombofighter/client/features/shared/web3'
import singleGame from '@apps/games/zombofighter/client/features/single-game'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        [web3Slice.name]: web3Slice.reducer,
        [user.slice.name]: user.slice.reducer,
        [sounds.slice.name]: sounds.slice.reducer,
        [searchGame.slice.name]: searchGame.slice.reducer,
        [singleGame.slice.name]: singleGame.slice.reducer,
        [result.slice.name]: result.slice.reducer,
        [authSlice.name]: authSlice.reducer,
    },
})

export type AppDispatch = typeof store.dispatch
