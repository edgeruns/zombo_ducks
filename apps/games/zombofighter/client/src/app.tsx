import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useSounds } from '@apps/games/zombofighter/client/features/shared/sounds'
import { useWebpSupport } from '@apps/games-zombofighter-client-utils'

import { HomeView } from './views/Home'
import { SearchGameView } from './views/SearchGame'
import { SingleGameView } from './views/SingleGame'
import { GameResultView } from './views/GameResult'

import { useFakeGame } from './useFakeGame'

export const App: FC = () => {
    useSounds()
    useWebpSupport()
    useFakeGame()

    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/game/search" element={<SearchGameView />} />
            <Route path="/game/:gameId" element={<SingleGameView />} />
            <Route path="/game/:gameId/result" element={<GameResultView />} />
        </Routes>
    )
}
