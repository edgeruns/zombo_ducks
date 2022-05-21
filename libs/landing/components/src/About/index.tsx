import React, { FC } from 'react'

import styles from './About.module.scss'

export const About: FC = () => {
    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>
                ZomboDucks
            </h1>

            <p className={styles.text}>
                First P2E gaming platform platform on NEAR protocol<br />
                May 2022: 1,555 unique nightmare ZomboDucks spawn
            </p>

            <button className={styles.button}>
                <div className={styles['button-text']}>
                    Mint Soon
                </div>
            </button>

            <div className={styles.ducks}>
                <img
                    className={styles.duck}
                    src="/about/duck-green.png"
                    alt="Duck"
                />

                <img
                    className={styles.duck}
                    src="/about/duck-purple.png"
                    alt="Duck"
                />

                <img
                    className={styles.duck}
                    src="/about/duck-blue.png"
                    alt="Duck"
                />
            </div>
        </section>
    )
}
