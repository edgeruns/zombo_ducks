import { configureStore } from '@reduxjs/toolkit'

import user from '@apps/games/zombofighter/client/features/shared/user'
import sounds from '@apps/games/zombofighter/client/features/shared/sounds'
import searchGame from '@apps/games/zombofighter/client/features/search-game'
import singleGame from '@apps/games/zombofighter/client/features/single-game'
import result from '@apps/games/zombofighter/client/features/result'
import { authSlice } from "@apps/games/zombofighter/client/features/auth";

export const store = configureStore({
    reducer: {
        [user.slice.name]: user.slice.reducer,
        [sounds.slice.name]: sounds.slice.reducer,
        [searchGame.slice.name]: searchGame.slice.reducer,
        [singleGame.slice.name]: singleGame.slice.reducer,
        [result.slice.name]: result.slice.reducer,
        [authSlice.name]: authSlice.reducer,
    }
})

export type AppDispatch = typeof store.dispatch
