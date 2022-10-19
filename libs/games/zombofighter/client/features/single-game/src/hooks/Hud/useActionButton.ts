import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Sounds, playSound } from '@apps/games/zombofighter/client/features/shared/sounds'

import * as actions from '../../data/actions'
import * as selectors from '../../data/selectors'
import { FeatureDispatch } from '../../data/store.feature'

export function useActionButton() {
    const dispatch = useDispatch<FeatureDispatch>()

    const game = useSelector(selectors.getGame)
    const isActionSended = useSelector(selectors.isActionSended)

    const isVisible = game.isWaiting()
    const isDisabled = isActionSended

    const handleClick = useCallback(() => {
        playSound(Sounds.Button)

        dispatch(actions.sendAction())
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
