import React, { FC, useEffect, useRef } from 'react'
import { useBreakpoint } from '@apps/utils'
import { rotate } from "next/dist/server/lib/squoosh/impl";

import styles from './Cursor.module.scss'

export const Cursor: FC = () => {
    const rootRef = useRef<HTMLDivElement>(null)
    const dotRef = useRef<HTMLDivElement>(null)
    const outlineRef = useRef<HTMLDivElement>(null)

    const breakpoint = useBreakpoint()
    const isDesktop = breakpoint === 'desktop'

    useEffect(() => {
        if (isDesktop) {
            const root = rootRef.current
            const dot = dotRef.current
            const outline = outlineRef.current

            const handleMouseMove = (event: MouseEvent) => {
                const { clientX, clientY } = event

                requestAnimationFrame(() => {
                    if (root) {
                        root.style.setProperty('--cursor-x', `${clientX}px`)
                        root.style.setProperty('--cursor-y', `${clientY}px`)
                    }
                })
            }

            const handleMouseOut = () => {
                if (dot && outline) {
                    dot.style.opacity = '0'
                    outline.style.opacity = '0'
                }
            }

            const handleMouseOver = () => {
                if (dot && outline) {
                    dot.style.opacity = '1'
                    outline.style.opacity = '1'
                }
            }

            const handleMouseDown = () => {
                if (dot && outline) {
                    dot.style.width = '20px'
                    dot.style.height = '20px'
                    outline.style.opacity = '0'
                }
            }

            const handleMouseUp = () => {
                if (dot && outline) {
                    dot.style.width = ''
                    dot.style.height = ''
                    outline.style.opacity = '1'
                }
            }

            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseout', handleMouseOut)
            window.addEventListener('mouseover', handleMouseOver)
            window.addEventListener('mousedown', handleMouseDown)
            window.addEventListener('mouseup', handleMouseUp)

            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseout', handleMouseOut)
                window.removeEventListener('mouseover', handleMouseOver)
                window.removeEventListener('mousedown', handleMouseDown)
                window.removeEventListener('mouseup', handleMouseUp)
            }
        }

        return undefined
    }, [isDesktop])

    if (!isDesktop) {
        return null
    }

    return (
        <div
            className={styles.root}
            ref={rootRef}
        >
            <div
                className={styles.dot}
                ref={dotRef}
            />

            <div
                className={styles.outline}
                ref={outlineRef}
            />
        </div>
    )
}
