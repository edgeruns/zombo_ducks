import { configureStore } from '@reduxjs/toolkit'

import game from '@apps/games-zombofighter-client-data'
import user from '@apps/games/zombofighter/client/features/shared/user'
import sounds from '@apps/games/zombofighter/client/features/shared/sounds'
import searchGame from '@apps/games/zombofighter/client/features/search-game'

import { socketMiddleware } from './socket'

export const store = configureStore({
    reducer: {
        [game.slice.name]: game.slice.reducer,
        [user.slice.name]: user.slice.reducer,
        [sounds.slice.name]: sounds.slice.reducer,
        [searchGame.slice.name]: searchGame.slice.reducer
    },
    middleware: getDefaultMiddleware => {
        const defaultMiddleware = getDefaultMiddleware()

        return defaultMiddleware
            .concat(socketMiddleware())
    }
})
