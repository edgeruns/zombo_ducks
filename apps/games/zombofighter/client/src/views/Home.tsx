import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { HomePlayerContainer } from '@apps/games/zombofighter/client/features/home-player'
import { MenuContainer } from '@apps/games/zombofighter/client/features/menu'
import { getCurrentPlayer } from '@apps/games/zombofighter/client/features/shared/web3'
import { StartGameContainer } from '@apps/games/zombofighter/client/features/start-game'

import { AppDispatch } from '../store'

export const HomeView: FC = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getCurrentPlayer())
    }, [dispatch])

    return (
        <>
            <MenuContainer />
            <StartGameContainer />
            <HomePlayerContainer />
        </>
    )
}
