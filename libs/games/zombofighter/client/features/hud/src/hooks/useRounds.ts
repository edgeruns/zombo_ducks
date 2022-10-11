import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as selectors from '../data/selectors'
import game from '@apps/games-zombofighter-client-data'

export function useRounds() {
    const dispatch = useDispatch()

    const isVisible = useSelector(selectors.isRoundsVisible)
    const isWatchBlinking = useSelector(selectors.isRoundsWatchBlinking)
    const isWatchExpired = useSelector(selectors.isRoundsWatchExpired)
    const isStartTimer = useSelector(selectors.isRoundsStartTimer)
    const isStopTimer = useSelector(selectors.isRoundsStopTimer)
    const timeLeft = useSelector(selectors.getRoundsTimeLeft)
    const current = useSelector(selectors.getRoundsCurrent)
    const count = useSelector(selectors.getRoundsCount)

    const timeIntervalIdRef = useRef<NodeJS.Timer>()

    useEffect(() => {
        const timeIntervalId = timeIntervalIdRef.current

        if (isStopTimer && timeIntervalId) {
            clearInterval(timeIntervalId)
        }
    }, [isStopTimer])

    useEffect(() => {
        if (isStartTimer) {
            let time = timeLeft

            timeIntervalIdRef.current = setInterval(() => {
                dispatch(game.slice.actions.setTimeLeft(--time))
            }, 1000)
        }
    }, [dispatch, isStartTimer])

    return useMemo(() => {
        return {
            isVisible,
            isWatchBlinking,
            isWatchExpired,
            time: timeLeft,
            current,
            count
        }
    }, [isVisible, isWatchBlinking, isWatchExpired, timeLeft, current, count])
}
