import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { MAX_ATTACKS, MAX_DEFENCES } from '../../data/constants'
import * as selectors from '../../data/selectors'

export function useBodyPartsCheckbox() {
    const isGameStart = useSelector(selectors.isGameStart)
    const playerAttacks = useSelector(selectors.getPlayerAttacks)
    const playerDefences = useSelector(selectors.getPlayerDefences)

    const attacksCount = playerAttacks.filter((attack) => attack === 1).length
    const defencesCount = playerDefences.filter(
        (defence) => defence === 1
    ).length

    const isVisible = !isGameStart
    const selectedCount = attacksCount + defencesCount

    return useMemo(() => {
        return {
            isVisible,
            maxCount: MAX_ATTACKS + MAX_DEFENCES,
            selectedCount,
        }
    }, [isVisible, selectedCount])
}
