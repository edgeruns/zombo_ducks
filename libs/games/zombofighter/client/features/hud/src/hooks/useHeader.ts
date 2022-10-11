import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game from '@apps/games-zombofighter-client-data'

import * as selectors from '../data/selectors'

export function useHeader() {
    const dispatch = useDispatch()

    const isVisible = useSelector(selectors.isHeaderVisible)
    const isCanQuit = useSelector(selectors.isHeaderCanQuit)
    const player = useSelector(selectors.getHeaderPlayer)
    const opponent = useSelector(selectors.getHeaderOpponent)

    const handleQuitClick = useCallback(() => {
        dispatch(game.slice.actions.setQuitPopupOpened(true))
    }, [dispatch])

    return useMemo(() => {
        return {
            isVisible,
            isCanQuit,
            player,
            opponent,
            handleQuitClick
        }
    }, [isVisible, isCanQuit, player, opponent, handleQuitClick])
}
