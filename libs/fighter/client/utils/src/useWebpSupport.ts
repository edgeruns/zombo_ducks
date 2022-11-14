import { useEffect } from 'react'

const isWebpSupported = () => {
    const canvas = document.createElement('canvas')

    try {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch {
        return false
    }
}

export function useWebpSupport() {
    useEffect(() => {
        const html = document.documentElement
        const supported = isWebpSupported()

        html.dataset.webp = `${supported}`
    }, [])
}
