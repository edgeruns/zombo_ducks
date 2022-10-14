import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'

import { useSounds } from '@apps/games/zombofighter/client/features/shared/sounds'
import { useWebpSupport } from '@apps/games-zombofighter-client-utils'

import { HomePage } from './pages/Home'
import { SearchGamePage } from './pages/SearchGame'

export const App: FC = () => {
    useSounds()
    useWebpSupport()

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/search" element={<SearchGamePage />} />
        </Routes>
    )
}
