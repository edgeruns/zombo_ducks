import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { playSound,Sounds } from '@apps/fighter/client/features/shared/sounds'

import * as actions from '../../data/actions'
import * as selectors from '../../data/selectors'

export function useQuitPopup() {
    const dispatch = useDispatch<any>()

    const isVisible = useSelector(selectors.isQuitPopupVisible)

    const handleConfirmClick = useCallback(() => {
        playSound(Sounds.Button)

        dispatch(actions.quit())
    }, [dispatch])

    const handleCancelClick = useCallback(() => {
        playSound(Sounds.Button)

        dispatch(actions.hideQuitPopup())
    }, [dispatch])

    return useMemo(() => {
        return {
            isVisible,
            handleConfirmClick,
            handleCancelClick,
        }
    }, [isVisible, handleConfirmClick, handleCancelClick])
}
