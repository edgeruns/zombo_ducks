import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import * as selectors from '../../data/selectors'

export function useRoundGreeting() {
    const isGameStart = useSelector(selectors.isGameStart)
    const game = useSelector(selectors.getGame)
    const rounds = useSelector(selectors.getRounds)

    const [isVisible, setIsVisible] = useState(false)

    const isShow = isGameStart || !game.isWaiting()

    useEffect(() => {
        if (isShow && !isVisible) {
            setIsVisible(true)
            setTimeout(setIsVisible, 2000, false)
        }
    }, [rounds.length, isVisible])

    return useMemo(() => {
        return {
            isVisible,
            text: rounds.length <= 1 ? 'VS' : `Round ${rounds.length}`
        }
    }, [isVisible, rounds.length])
}
