import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import * as selectors from '../data/selectors'

export function useSearching() {
    const isSearchingVisible = useSelector(selectors.isSearchingVisible)

    return useMemo(() => {
        return {
            isVisible: isSearchingVisible,
            text: 'Search for opponent'
        }
    }, [isSearchingVisible])
}
