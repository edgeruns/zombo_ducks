import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuthCheck } from '@apps/fighter/client/features/auth'
import { useSounds } from '@apps/fighter/client/features/shared/sounds'
import { useWebpSupport } from '@apps/fighter/client/utils'

import { AddDepositView } from './views/AddDepositView'
import { ConnectWallet } from './views/ConnetWallet/ConnectWallet'
import { GameResultView } from './views/GameResult'
import { HomeView } from './views/Home'
import { LoadingView } from './views/LoadingView'
import { SearchGameView } from './views/SearchGame'
import { SingleGameView } from './views/SingleGame'
import { useFakeGame } from './useFakeGame'

export const App: FC = () => {
    const status = useAuthCheck()

    useSounds()
    useWebpSupport()
    useFakeGame()

    return status.checking ? (
        <LoadingView />
    ) : (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/game/search" element={<SearchGameView />} />
            <Route path="/game/:gameId" element={<SingleGameView />} />
            <Route path="/game/:gameId/result" element={<GameResultView />} />
            <Route path="/connect" element={<ConnectWallet />} />
            <Route path="/deposit" element={<AddDepositView />} />
        </Routes>
    )
}
