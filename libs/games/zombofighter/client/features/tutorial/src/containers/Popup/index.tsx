import { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game, { Mode } from '@apps/games-zombofighter-client-data'

import * as selectors from '../../data/selectors'
import { Popup } from '../../ui'

export const TutorialPopupContainer: FC = () => {
    const dispatch = useDispatch<any>()

    const isVisible = useSelector(selectors.isPopupVisible)

    const [screenIndex, setScreenIndex] = useState(0)

    const handlePrevClick = useCallback(() => {
        setScreenIndex(prev => prev - 1)
    }, [])

    const handleNextClick = useCallback(() => {
        setScreenIndex(prev => prev + 1)
    }, [])

    const handleCrossClick = useCallback(() => {
        dispatch(game.slice.actions.setMode(Mode.Game))
    }, [dispatch])

    return (
        <Popup
            isVisible={isVisible}
            screenIndex={screenIndex}
            onPrevClick={handlePrevClick}
            onNextClick={handleNextClick}
            onCrossClick={handleCrossClick}
        />
    )
}
