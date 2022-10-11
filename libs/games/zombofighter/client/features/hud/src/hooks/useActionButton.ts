import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game from '@apps/games-zombofighter-client-data'
import { Sounds, playSound } from '@apps/games/zombofighter/client/features/shared/sounds'

import * as selectors from '../data/selectors'

export function useActionButton() {
    const dispatch = useDispatch<any>()

    const isVisible = useSelector(selectors.isActionButtonVisible)
    const isDisabled = useSelector(selectors.isActionButtonDisabled)

    const handleClick = useCallback(() => {
        playSound(Sounds.Button)

        dispatch(game.actions.attack())
    }, [dispatch])

    return useMemo(() => {
        return {
            isVisible,
            isDisabled,
            text: 'ATTACK',
            handleClick
        }
    }, [isVisible, isDisabled, handleClick])
}
