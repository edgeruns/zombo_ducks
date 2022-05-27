import React, { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'

import styles from './Header.module.scss'

export const Header: FC = () => {
    const twitterClassName = classNames(styles.social, styles.social_twitter)
    const discordClassName = classNames(styles.social, styles.social_discord)

    return (
        <header className={styles.wrapper}>
            <Link href="/">
                <a className={styles.logo}>
                    ZomboDucks
                </a>
            </Link>
            <nav className={styles.nav}>
                <ul className={styles['nav-list']}>
                    <li className={styles['nav-item']}>
                        <Link href="#offer">
                            <a className={styles['nav-link']}>What do we offer?</a>
                        </Link>
                    </li>

                    <li className={styles['nav-item']}>
                        <Link href="#mint">
                            <a className={styles['nav-link']}>What to mint Ducks?</a>
                        </Link>
                    </li>

                    <li className={styles['nav-item']}>
                        <Link href="#roadmap">
                            <a className={styles['nav-link']}>Roadmap</a>
                        </Link>
                    </li>

                    <li className={styles['nav-item']}>
                        <Link href="#team">
                            <a className={styles['nav-link']}>Our team</a>
                        </Link>
                    </li>

                    <li className={styles['nav-item']}>
                        <Link href="#faq">
                            <a className={styles['nav-link']}>FAQ</a>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className={styles.socials}>
                <a
                    className={twitterClassName}
                    href="https://twitter.com/ZomboDucks"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Twitter
                </a>

                <a
                    className={discordClassName}
                    href="https://discord.com/invite/PaWxs5Gp9V"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Discord
                </a>
            </div>
        </header>
    )
}
