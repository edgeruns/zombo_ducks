import { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game from '@apps/games-zombofighter-client-data'
import { Sounds, playSound } from '@apps/games/zombofighter/client/features/shared/sounds'

import * as selectors from '../../data/selectors'
import { Popup } from '../../ui'

export const ResultPopupContainer: FC = () => {
    const dispatch = useDispatch<any>()

    const isVisible = useSelector(selectors.isPopupVisible)
    const isVictory = useSelector(selectors.isVictory)
    const isLose = useSelector(selectors.isLose)
    const player = useSelector(selectors.getPlayer)
    const profit = useSelector(selectors.getProfit)

    const handleAgainClick = useCallback(() => {
        playSound(Sounds.Laugh)

        dispatch(game.actions.startSearch())
    }, [dispatch])

    const handleCrossClick = useCallback(() => {
        dispatch(game.slice.actions.reset())
    }, [dispatch])

    return player && (
        <Popup
            isVisible={isVisible}
            isVictory={isVictory}
            isLose={isLose}
            player={player}
            profit={profit}
            onAgainClick={handleAgainClick}
            onCrossClick={handleCrossClick}
        />
    )
}
