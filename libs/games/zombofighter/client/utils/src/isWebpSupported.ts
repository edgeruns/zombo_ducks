export function isWebpSupported() {
    const canvas = document.createElement('canvas')

    try {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    } catch {
        return false
    }
}
