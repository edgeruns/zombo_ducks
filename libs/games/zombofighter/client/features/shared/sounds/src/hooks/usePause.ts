import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import * as selectors from '../data/selectors'
import { pauseSounds } from '../utils'

export function usePause() {
    const isEnabled = useSelector(selectors.isEnabled)

    useEffect(() => {
        if (!isEnabled) {
            pauseSounds()
        }
    }, [isEnabled])
}
