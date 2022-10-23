import { FC, useEffect } from "react";

import { MenuContainer } from '@apps/games/zombofighter/client/features/menu'
import { StartGameContainer } from '@apps/games/zombofighter/client/features/start-game'
import { HomePlayerContainer } from '@apps/games/zombofighter/client/features/home-player'
import { useNavigate } from "react-router-dom";

export const HomeView: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/connect')
    }, [navigate])

    return (
        <>
            <MenuContainer />
            <StartGameContainer />
            <HomePlayerContainer />
        </>
    )
}
