import React, { FC } from 'react'
import classNames from 'classnames/bind'

import {
    GamesStatistics,
    ProfileInfo,
    Button,
    CrossButton
} from '@apps/games-zombofighter-client-uikit'

import { Props } from './types'
import { getTitle, getProfitText } from './utils'

import styles from './ResultPopup.module.scss'

const cx = classNames.bind(styles)

export const Popup: FC<Props> = props => {
    const {
        isVictory,
        isDraws,
        isLose,
        player,
        profit,
        onAgainClick,
        onCrossClick
    } = props

    const title = getTitle(profit)
    const profitText = getProfitText(profit)

    const rootClassName = cx('root', {
        'root--lose': isLose,
        'root--draws': isDraws,
        'root--victory': isVictory
    })

    return (
        <div className={rootClassName}>
            <h2 className={styles.title}>
                {title}
            </h2>

            <div className={styles.info}>
                <GamesStatistics
                    wins={player.statistics.wins}
                    loses={player.statistics.loses}
                    className={styles.games}
                />

                <ProfileInfo
                    nickname={player.nickname}
                    avatar={player.avatar}
                />
            </div>

            <div className={styles.profit}>
                {profitText}
            </div>

            <Button
                className={styles.button}
                onClick={onAgainClick}
            >
                TRY AGAIN
            </Button>

            <CrossButton
                className={styles.close}
                onClick={onCrossClick}
            />
        </div>
    )
}
