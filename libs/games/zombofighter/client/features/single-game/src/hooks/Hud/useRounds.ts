import { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ms from 'ms'

import { Game } from '@apps/games/zombofighter/domain'

import * as actions from '../../data/actions'
import * as selectors from '../../data/selectors'
import { FeatureDispatch } from '../../data/store.feature'

export function useRounds() {
    const dispatch = useDispatch<FeatureDispatch>()

    const game = useSelector(selectors.getGame)
    const isGameStart = useSelector(selectors.isGameStart)
    const rounds = useSelector(selectors.getRounds)
    const lastRound = useSelector(selectors.getLastRound)

    const [timeLeft, setTimeLeft] = useState(ms(Game.meta.DEFAULT_ROUND_TIME) / 1000)

    const timeIntervalIdRef = useRef<NodeJS.Timer>()

    const isVisible = !isGameStart
    const isWatchBlinking = timeLeft > 0 && timeLeft < 4
    const isWatchExpired = timeLeft === 0
    const isStartTimer = game.isWaiting()
    const isStopTimer = !game.isWaiting() || timeLeft === 0
    const current = rounds.length
    const count = Game.meta.MAX_ROUNDS

    useEffect(() => {
        if (isStartTimer) {
            const time = Math.round(ms(Game.meta.DEFAULT_ROUND_TIME) / 1000)

            setTimeLeft(time)

            timeIntervalIdRef.current = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
        }
    }, [isStartTimer])

    useEffect(() => {
        const timeIntervalId = timeIntervalIdRef.current

        if (isStopTimer && timeIntervalId) {
            clearInterval(timeIntervalId)
        }
    }, [isStopTimer])

    useEffect(() => {
        if (timeLeft === 0) {
            dispatch(actions.sendAction())
        }
    }, [dispatch, timeLeft])

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
