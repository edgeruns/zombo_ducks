import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import game, { BodyParts } from '@apps/games-zombofighter-client-data'

import * as selectors from '../data/selectors'

export function useDefend() {
    const dispatch = useDispatch()

    const isVisible = useSelector(selectors.isDefendVisible)
    const isIconVisible = useSelector(selectors.isDefendIconVisible)
    const selectedParts = useSelector(selectors.getDefendSelectedParts)
    const defendedParts = useSelector(selectors.getDefendDefendedParts)
    const damagedParts = useSelector(selectors.getDefendDamagedParts)
    const disabledParts = useSelector(selectors.getDefendDisabledParts)
    const darkedParts = useSelector(selectors.getDefendDarkedParts)

    const handleBodyPartClick = useCallback((part: BodyParts) => {
        dispatch(game.slice.actions.defend(part))
    }, [dispatch])

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
