import React, { FC, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { useSounds } from '@apps/games/zombofighter/client/features/shared/sounds'
import { useWebpSupport } from '@apps/games-zombofighter-client-utils'

import { HomeView } from './views/Home'
import { SearchGameView } from './views/SearchGame'
import { SingleGameView } from './views/SingleGame'
import { GameResultView } from './views/GameResult'

import { useFakeGame } from './useFakeGame'
import { ConnectWallet } from './views/ConnetWallet/ConnectWallet'
import { useAuthCheck } from "@apps/games/zombofighter/client/features/auth";

export const App: FC = () => {
    const [loading, setLoading] = useState<boolean>()
    const status = useAuthCheck()
    const navigator = useNavigate()

    useSounds()
    useWebpSupport()
    useFakeGame()

    useEffect(() => {
        setLoading(status.checking)
    }, [status.checking])

    useEffect(() => {
        if (!status.authorized) {
            navigator('/connect')
        } else {
            navigator('/')
        }

    }, [navigator, status.authorized])


    return loading ? (
        <div>loading...</div>
    ) : (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/game/search" element={<SearchGameView />} />
            <Route path="/game/:gameId" element={<SingleGameView />} />
            <Route path="/game/:gameId/result" element={<GameResultView />} />
            <Route path="/connect" element={<ConnectWallet />} />
        </Routes>
    )
}
