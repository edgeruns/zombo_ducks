import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { MAX_ATTACK_COUNT, MAX_DEFENDE_COUNT } from '@apps/games-zombofighter-client-data'

import * as selectors from '../data/selectors'

export function useBodyPartsCheckbox() {
    const isVisible = useSelector(selectors.isBodyPartsCheckboxVisible)
    const selectedCount = useSelector(selectors.getBodyPartsCheckboxSelectedCount)

    return useMemo(() => {
        return {
            isVisible,
            maxCount: MAX_ATTACK_COUNT + MAX_DEFENDE_COUNT,
            selectedCount
        }
    }, [isVisible, selectedCount])
}
