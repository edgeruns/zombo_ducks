import React, { CSSProperties, FC, useState, useMemo, useEffect } from 'react'

import { Row } from '../Row'

import styles from './About.module.scss'

export const About: FC = () => {
    const [scrollPercent, setScrollPercent] = useState(0)

    const greenDuckStyle = useMemo(() => {
        const startDeg = 340
        const startTranslate = 35

        const newDeg = startDeg + 360 * (scrollPercent / 100) * 1.2
        const deg = Math.min(360, newDeg)

        const newTranslate = startTranslate - 100 / startTranslate * scrollPercent * 2.5
        const translate = Math.max(0, newTranslate)

        return {
            transform: `translateX(${translate}%) rotate(${deg}deg)`
        } as CSSProperties
    }, [scrollPercent])

    const purpleDuckStyle = useMemo(() => {
        const startTranslate = 15

        const newTranslate = startTranslate - 100 / startTranslate * scrollPercent / 2.2
        const translate = Math.max(0, newTranslate)

        return {
            transform: `translateY(-${translate}%)`
        } as CSSProperties
    }, [scrollPercent])

    const blueDuckStyle = useMemo(() => {
        const startDeg = 340
        const startTranslate = 35

        const newDeg = startDeg + 360 * (scrollPercent / 100) * 1.2
        const deg = Math.min(360, newDeg)

        const newTranslate = startTranslate - 100 / startTranslate * scrollPercent * 2.5
        const translate = Math.max(0, newTranslate)

        return {
            transform: `translateX(-${translate}%) rotate(-${deg}deg)`
        } as CSSProperties
    }, [scrollPercent])

    useEffect(() => {
        const handleScroll = () => {
            setScrollPercent(window.scrollY / document.body.scrollHeight * 100)
        }

        window.addEventListener('scroll', handleScroll, false)

        return () => {
            window.removeEventListener('scroll', handleScroll, false)
        }
    }, [])

    return (
        <section className={styles.wrapper}>
            <Row>
                <h1 className={styles.title}>
                    ZomboDucks
                </h1>

                <p className={styles.text}>
                    First P2E gaming platform platform on NEAR protocol<br />
                    October 2022: 1,555 unique nightmare ZomboDucks spawn
                </p>

                <button className={styles.button}>
                    <div className={styles['button-content']}>
                        <div className={styles['button-text']}>
                            Mint Soon
                        </div>
                    </div>
                </button>

                <div className={styles.ducks}>
                    <img
                        className={styles.duck}
                        style={greenDuckStyle}
                        src="/about/duck-green.png"
                        alt="Duck"
                    />

                    <img
                        className={styles.duck}
                        style={purpleDuckStyle}
                        src="/about/duck-purple.png"
                        alt="Duck"
                    />

                    <img
                        className={styles.duck}
                        style={blueDuckStyle}
                        src="/about/duck-blue.png"
                        alt="Duck"
                    />
                </div>
            </Row>
        </section>
    )
}
