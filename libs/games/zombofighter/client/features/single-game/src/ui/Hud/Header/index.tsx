import React, { FC } from 'react'
import classNames from 'classnames/bind'

import {
    ProgressBar,
    ProgressBarColors,
    GamesStatistics,
    ProfileInfo,
    CrossButton,
} from '@apps/games-zombofighter-client-uikit'

import { Props } from './types'

import styles from './Header.module.scss'

const cx = classNames.bind(styles)

export const Header: FC<Props> = props => {
    const { isVisible, isCanQuit, player, opponent, onQuitClick } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    const opponentClassName = cx('gamer', 'gamer--opponent')
    const playerClassName =  cx('gamer', 'gamer--player')

    return (
        <header className={rootClassName}>
            {opponent && (
                <div className={opponentClassName}>
                    <ProgressBar
                        progress={opponent.health}
                        color={ProgressBarColors.Red}
                        text={`${opponent.health}/100`}
                        className={styles.health}
                    />

                    <GamesStatistics
                        wins={opponent.statistics.wins}
                        loses={opponent.statistics.loses}
                        className={styles.games}
                    />

                    <ProfileInfo
                        avatar={opponent.avatar}
                        nickname={opponent.nickname}
                    />
                </div>
            )}

            {player && (
                <div className={playerClassName}>
                    <GamesStatistics
                        wins={player.statistics.wins}
                        loses={player.statistics.loses}
                        className={styles.games}
                    />

                    <ProfileInfo
                        avatar={player.avatar}
                        nickname={player.nickname}
                    />

                    <ProgressBar
                        progress={player.health}
                        color={ProgressBarColors.Purple}
                        text={`${player.health}/100`}
                        reversed={true}
                        className={styles.health}
                    />
                </div>
            )}

            {isCanQuit && (
                <CrossButton
                    className={styles.quit}
                    onClick={onQuitClick}
                />
            )}
        </header>
    )
}
