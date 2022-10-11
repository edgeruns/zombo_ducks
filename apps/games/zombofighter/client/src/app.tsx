import React, { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import game from '@apps/games-zombofighter-client-data'
import { HudContainer } from '@apps/games/zombofighter/client/features/hud'
import { PlayerContainer } from '@apps/games/zombofighter/client/features/player'
import { OpponentContainer } from '@apps/games/zombofighter/client/features/opponent'
import { ResultPopupContainer } from '@apps/games/zombofighter/client/features/result'
import { TutorialContainer, TutorialPopupContainer } from '@apps/games/zombofighter/client/features/tutorial'
import { useSounds } from '@apps/games/zombofighter/client/features/shared/sounds'
import { useWebpSupport } from '@apps/games-zombofighter-client-utils'

export const App: FC = () => {
    const dispatch = useDispatch<any>()

    useSounds()
    useWebpSupport()

    useEffect(() => {
        dispatch(game.actions.getPlayer())
    }, [dispatch])

    return (
        <>
            <HudContainer />
            <PlayerContainer />
            <OpponentContainer />
            <ResultPopupContainer />
            <TutorialContainer />
            <TutorialPopupContainer />
        </>
    )
}
