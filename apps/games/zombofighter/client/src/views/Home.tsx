import { FC } from 'react'

import { MenuContainer } from '@apps/games/zombofighter/client/features/menu'
import { StartGameContainer } from '@apps/games/zombofighter/client/features/start-game'
import { HomePlayerContainer } from '@apps/games/zombofighter/client/features/home-player'

export const HomeView: FC = () => {
    return (
        <>
            <MenuContainer />
            <StartGameContainer />
            <HomePlayerContainer />
        </>
    )
}
