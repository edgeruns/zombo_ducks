import { configureStore } from '@reduxjs/toolkit'

import game from '@apps/games-zombofighter-client-data'
import sounds from '@apps/games/zombofighter/client/features/shared/sounds'

export const store = configureStore({
    reducer: {
        [game.slice.name]: game.slice.reducer,
        [sounds.slice.name]: sounds.slice.reducer
    },
})
