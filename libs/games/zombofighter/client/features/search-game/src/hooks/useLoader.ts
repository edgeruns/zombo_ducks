import { useMemo } from 'react'

export function useLoader() {
    return useMemo(() => {
        return {
            text: 'Search for opponent'
        }
    }, [])
}
