import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game, { Mode } from '@apps/games-zombofighter-client-data'
import sounds from '@apps/games/zombofighter/client/features/shared/sounds'

import * as selectors from '../data/selectors'

export function useMenu() {
    const dispatch = useDispatch<any>()

    const isVisible = useSelector(selectors.isMenuVisible)
    const isSoundsEnabled = useSelector(sounds.selectors.isEnabled)

    const handleSoundClick = useCallback(() => {
        dispatch(sounds.actions.toggle())
    }, [dispatch])

    const handleTutorialClick = useCallback(() => {
        dispatch(game.slice.actions.setMode(Mode.Tutorial))
    }, [dispatch])

    return useMemo(() => {
        return {
            isVisible,
            isSoundsDisabled: !isSoundsEnabled,
            handleSoundClick,
            handleTutorialClick
        }
    }, [isVisible, isSoundsEnabled, handleSoundClick, handleTutorialClick])
}
