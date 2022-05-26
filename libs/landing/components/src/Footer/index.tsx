import React, { FC } from 'react'

import styles from './Footer.module.scss'

const currentYear = new Date().getFullYear()

export const Footer: FC = () => {
    const copyright = `© ${currentYear} ZomboDucks. Powered by NEAR protocol. All rights reserved.`

    return (
        <footer className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.copyright}>
                    {copyright}
                </div>

                <a
                    className={styles.near}
                    href="https://near.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Near
                </a>

                <div className={styles.backtop}>
                    <span className={styles['backtop-text']}>Back to the top</span>
                    <div className={styles['backtop-arrow']} />
                </div>
            </div>
        </footer>
    )
}
