import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../data/actions'
import * as selectors from '../../data/selectors'

export function useHeader() {
    const dispatch = useDispatch()

    const isGameStart = useSelector(selectors.isGameStart)
    const player = useSelector(selectors.getPlayer)
    const opponent = useSelector(selectors.getEnemy)

    const isVisible = !isGameStart
    const isCanQuit = true

    const handleQuitClick = useCallback(() => {
        dispatch(actions.showQuitPopup())
    }, [dispatch])

    return useMemo(() => {
        return {
            isVisible,
            isCanQuit,
            player,
            opponent,
            handleQuitClick,
        }
    }, [isVisible, isCanQuit, player, opponent, handleQuitClick])
}
