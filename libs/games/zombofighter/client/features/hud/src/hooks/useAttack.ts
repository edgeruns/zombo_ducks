import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game, { BodyParts } from '@apps/games-zombofighter-client-data'
import { Sounds, playSound } from '@apps/games/zombofighter/client/features/shared/sounds'

import * as selectors from '../data/selectors'

export function useAttack() {
    const dispatch = useDispatch()

    const isVisible = useSelector(selectors.isAttackVisible)
    const isIconVisible = useSelector(selectors.isAttackIconVisible)
    const selectedParts = useSelector(selectors.getAttackSelectedParts)
    const defendedParts = useSelector(selectors.getAttackDefendedParts)
    const damagedParts = useSelector(selectors.getAttackDamagedParts)
    const disabledParts = useSelector(selectors.getAttackDisabledParts)
    const darkedParts = useSelector(selectors.getAttackDarkedParts)

    const handleBodyPartClick = useCallback((part: BodyParts) => {
        const selected = selectedParts.includes(part)

        if (!selected) {
            playSound(Sounds.Hit, true)
        }

        dispatch(game.slice.actions.attack(part))
    }, [dispatch, selectedParts])

    return useMemo(() => {
        return {
            isVisible,
            isIconVisible,
            selectedParts,
            defendedParts,
            damagedParts,
            disabledParts,
            darkedParts,
            handleBodyPartClick
        }
    }, [
        isVisible,
        isIconVisible,
        selectedParts,
        defendedParts,
        damagedParts,
        disabledParts,
        darkedParts,
        handleBodyPartClick
    ])
}
