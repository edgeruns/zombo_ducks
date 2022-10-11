import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import * as selectors from '../data/selectors'

export function useDamages() {
    const isVisible = useSelector(selectors.isDamagesVisible)
    const values = useSelector(selectors.getDamagesValues)

    return useMemo(() => {
        return {
            isVisible,
            values
        }
    }, [isVisible, values])
}
