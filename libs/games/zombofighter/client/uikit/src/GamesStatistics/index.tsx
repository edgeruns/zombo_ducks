import React, { FC } from 'react'
import classNames from 'classnames'

import bowlSrc from './assets/bowl.svg'

import styles from './GamesStatistics.module.scss'

type GamesStatisticsProps = {
    wins: number
    loses: number
    className?: string
}

export const GamesStatistics: FC<GamesStatisticsProps> = (props) => {
    const { wins, loses, className } = props

    const rootClassName = classNames(styles.root, className)

    return (
        <div className={rootClassName}>
            <img className={styles.icon} src={bowlSrc} alt="Bowl" />

            <span className={styles.text}>
                {wins}/{loses}
            </span>
        </div>
    )
}
