import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game from '@apps/games-zombofighter-client-data'
import { Sounds, playSound } from '@apps/games/zombofighter/client/features/shared/sounds'

import * as selectors from '../data/selectors'

export function useQuitPopup() {
    const dispatch = useDispatch<any>()

    const isVisible = useSelector(selectors.isQuitPopupVisible)

    const handleConfirmClick = useCallback(() => {
        playSound(Sounds.Button)

        dispatch(game.actions.quitGame())
    }, [dispatch])

    const handleCancelClick = useCallback(() => {
        playSound(Sounds.Button)

        dispatch(game.slice.actions.setQuitPopupOpened(false))
    }, [dispatch])

    return useMemo(() => {
        return {
            isVisible,
            handleConfirmClick,
            handleCancelClick
        }
    }, [isVisible, handleConfirmClick, handleCancelClick])
}
