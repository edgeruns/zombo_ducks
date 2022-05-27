import { useEffect, useState } from 'react'

type Breakpoint = 'desktop' | 'tablet' | 'mobile'

export function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState<Breakpoint | null>(null)

    useEffect(() => {
        const handleResize = () => {
            const { innerWidth } = window

            if (innerWidth >= 1200) {
                setBreakpoint('desktop')
            } else if (innerWidth >= 569) {
                setBreakpoint('tablet')
            } else {
                setBreakpoint('mobile')
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize, false)

        return () => {
            window.removeEventListener('resize', handleResize, false)
        }
    }, [])

    return breakpoint
}
