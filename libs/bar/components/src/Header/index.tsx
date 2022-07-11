import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { AppDispatch, slice, selectors } from '@apps/bar/data'
import { Sounds, playSound } from '@apps/bar/utils'
import { ProgressBar, ProgressBarColors, GamesStatistics, ProfileInfo, CrossButton } from '@apps/bar/uikit'

import styles from './Header.module.scss'

export const Header: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)

    const player = useSelector(selectors.getRoundPlayer)
    const opponent = useSelector(selectors.getRoundOpponent)

    const playerHealth = useSelector(selectors.getPlayerHealth)
    const opponentHealth = useSelector(selectors.getOpponentHealth)

    const isVisible = isRoundScene || isRoundFinishScene

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    const opponentClassName = classNames(
        styles.gamer,
        styles.gamer_opponent
    )

    const playerClassName = classNames(
        styles.gamer,
        styles.gamer_player
    )

    const handleQuitClick = useCallback(() => {
        dispatch(slice.actions.setQuitPopupOpened(true))
    }, [dispatch])

    return (
        <header className={rootClassName}>
            {opponent && (
                <div className={opponentClassName}>
                    <ProgressBar
                        progress={opponent.health}
                        color={ProgressBarColors.Red}
                        text={`${opponentHealth}/100`}
                        className={styles.health}
                    />

                    <GamesStatistics
                        won={opponent.games.won}
                        all={opponent.games.all}
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
                        won={player.games.won}
                        all={player.games.all}
                        className={styles.games}
                    />

                    <ProfileInfo
                        avatar={player.avatar}
                        nickname={player.nickname}
                    />

                    <ProgressBar
                        progress={player.health}
                        color={ProgressBarColors.Purple}
                        text={`${playerHealth}/100`}
                        reversed={true}
                        className={styles.health}
                    />
                </div>
            )}

            <CrossButton
                className={styles.quit}
                onClick={handleQuitClick}
            />
        </header>
    )
}
