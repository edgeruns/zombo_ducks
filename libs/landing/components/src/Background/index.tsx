import React, { FC, useCallback,useEffect, useRef } from 'react'
import { useBreakpoint } from '@apps/utils'

import styles from './Background.module.scss'

export const Background: FC = () => {
    const breakpoint = useBreakpoint()

    const wrapperRef = useRef<HTMLDivElement>(null)

    const moveItems = useCallback((event: MouseEvent) => {
        const wrapper = wrapperRef.current
        const items = wrapper?.children
        const next = document.querySelector<HTMLDivElement>('#__next')

        if (items && next) {
            for (let i = 0; i < items.length; i++) {
                const clientX = event.clientX - next.offsetLeft
                const clientY = event.clientY + document.documentElement.scrollTop

                const item = items[i] as HTMLElement
                const itemXOffset = window.innerWidth - next.offsetLeft - item.offsetLeft - item.offsetWidth / 2
                const itemYOffset = item.offsetTop - item.offsetHeight / 2

                const speed = 4

                const x = (clientX - itemXOffset) / speed
                const y = (clientY - itemYOffset) / speed

                const style = `transform: translate3d(${x}px, ${y}px, 0);`

                item.setAttribute('style', style)
            }
        }
    }, [])

    const resetItems = useCallback(() => {
        const wrapper = wrapperRef.current
        const items = wrapper?.children

        if (items) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i]

                item.setAttribute('style', '')
            }
        }
    }, [])

    useEffect(() => {
        if (breakpoint === 'desktop') {
            window.addEventListener('mousemove', moveItems)

            return () => {
                window.removeEventListener('mousemove', moveItems)
            }
        } else {
            resetItems()
        }

        return undefined
    }, [breakpoint, moveItems, resetItems])

    return (
        <div
            className={styles.wrapper}
            ref={wrapperRef}
        >
            <div className={styles.item} />
            <div className={styles.item} />
            <div className={styles.item} />
            <div className={styles.item} />
        </div>
    )
}
