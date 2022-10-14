import { FC } from 'react'

import { StartGameContainer } from '@apps/games/zombofighter/client/features/start-game'
import { HomePlayerContainer } from '@apps/games/zombofighter/client/features/home-player'

export const HomePage: FC = () => {
    return (
        <>
            <StartGameContainer />
            <HomePlayerContainer />
        </>
    )
}
