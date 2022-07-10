import React, { FC } from 'react'
import classNames from 'classnames'

import bowlSrc from './assets/bowl.svg'

import styles from './Games.module.scss'

type GamesProps = {
    won: number
    all: number
    className?: string
}

export const Games: FC<GamesProps> = props => {
    const { won, all, className } = props

    const rootClassName = classNames(
        styles.root,
        className
    )

    return (
        <div className={rootClassName}>
            <img
                className={styles.icon}
                src={bowlSrc}
                alt="Bowl"
            />

            <span className={styles.text}>
                {won}/{all}
            </span>
        </div>
    )
}
