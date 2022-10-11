import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import * as selectors from '../data/selectors'

export function useRoundGreeting() {
    const isShow = useSelector(selectors.isRoundGreetingShow)
    const roundNum = useSelector(selectors.getRoundGreetingNum)

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isShow && !isVisible) {
            setIsVisible(true)
            setTimeout(setIsVisible, 2000, false)
        }
    }, [isShow, isVisible])

    return useMemo(() => {
        return {
            isVisible,
            text: roundNum === 1 ? 'VS' : `Round ${roundNum}`
        }
    }, [isVisible, roundNum])
}
