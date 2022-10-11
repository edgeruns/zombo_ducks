import React, { FC } from 'react'
import classNames from 'classnames/bind'

import {
    GamesStatistics,
    ProfileInfo,
    Button,
    CrossButton
} from '@apps/games-zombofighter-client-uikit'

import { Props } from './types'

import styles from './ResultPopup.module.scss'

const cx = classNames.bind(styles)

export const Popup: FC<Props> = props => {
    const {
        isVisible,
        isVictory,
        isLose,
        player,
        profit,
        onAgainClick,
        onCrossClick
    } = props

    const title = isVictory ? 'VICTORY!' : 'LOSE'
    const profitText = isVictory ? `+ ${profit}` : profit

    const rootClassName = cx('root', {
        'root--lose': isLose,
        'root--victory': isVictory,
        'root--visible': isVisible
    })

    return (
        <div className={rootClassName}>
            <h2 className={styles.title}>
                {title}
            </h2>

            <div className={styles.info}>
                <GamesStatistics
                    won={player.statistics.wonGames}
                    all={player.statistics.allGames}
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
