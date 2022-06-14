import React, { FC, useRef, useEffect } from 'react'

import { useBreakpoint,  } from '@apps/utils'

import styles from './Background.module.scss'

export const Background: FC = () => {
    const breakpoint = useBreakpoint()

    const wrapperRef = useRef<HTMLDivElement>(null)

    // @ts-ignore
    useEffect(() => {
        const wrapper = wrapperRef.current
        const items = wrapper?.children
        const next = document.querySelector<HTMLDivElement>('#__next')

        if (items && next && breakpoint === 'desktop') {
            const onMouseMove = (event: MouseEvent) => {
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

            window.addEventListener('mousemove', onMouseMove)

            return () => {
                window.removeEventListener('mousemove', onMouseMove)
            }
        }
    }, [breakpoint])

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
