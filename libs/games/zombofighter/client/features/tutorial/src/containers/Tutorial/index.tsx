import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game from '@apps/games-zombofighter-client-data'

import * as selectors from '../../data/selectors'
import { STEPS } from './constants'
import { Tutorial } from '../../ui'

export const TutorialContainer: FC = () => {
    const dispatch = useDispatch<any>()

    const isVisible = useSelector(selectors.isVisible)
    const isHintVisible = useSelector(selectors.isHintVisible)
    const isRoundTimeExpired = useSelector(selectors.isRoundTimeExpired)

    const [active, setActive] = useState(0)

    const handleHintClick = useCallback(() => {
        const isLast = active + 1 >= STEPS.length

        if (isLast) {
            dispatch(game.slice.actions.reset())
        } else if (active === 2) {
            dispatch(game.slice.actions.startTutorialRound())
        } else {
            setActive(active + 1)
        }
    }, [dispatch, active])

    useEffect(() => {
        if (isRoundTimeExpired) {
            setActive(prev => prev + 1)

            dispatch(game.slice.actions.startTutorialRoundFinish())
        }
    }, [dispatch, isRoundTimeExpired])

    return (
        <Tutorial
            isVisible={isVisible}
            isHintVisible={isHintVisible}
            active={active}
            step={STEPS[active]}
            onHintClick={handleHintClick}
        />
    )
}
