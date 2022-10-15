import { useMemo } from 'react'

export function useDamages() {
    const isVisible = false
    const values = [0, 0] as [number, number]

    return useMemo(() => {
        return {
            isVisible,
            values
        }
    }, [isVisible, values])
}
