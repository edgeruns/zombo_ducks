import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import {
    AppDispatch,
    slice,
    selectors,
} from '@apps/games-zombofighter-client-data'
import {
    ProgressBar,
    ProgressBarColors,
    GamesStatistics,
    ProfileInfo,
    CrossButton,
} from '@apps/games-zombofighter-client-uikit'

import styles from './Header.module.scss'

export const Header: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const isTutorialMode = useSelector(selectors.isTutorialMode)
    const isGameStartScene = useSelector(selectors.isGameStartScene)
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)

    const player = useSelector(selectors.getPlayer)
    const opponent = useSelector(selectors.getOpponent)

    const playerHealth = useSelector(selectors.getPlayerHealth)
    const opponentHealth = useSelector(selectors.getOpponentHealth)

    const isVisible = isRoundScene || isRoundFinishScene

    const rootClassName = classNames(
        styles.root,
        isGameStartScene && styles.root_arrive,
        isVisible && styles.root_visible
    )

    const opponentClassName = classNames(styles.gamer, styles.gamer_opponent)

    const playerClassName = classNames(styles.gamer, styles.gamer_player)

    const handleQuitClick = useCallback(() => {
        dispatch(slice.actions.setQuitPopupOpened(true))
    }, [dispatch])

    return (
        <header className={rootClassName}>
            {opponent && (
                <div className={opponentClassName}>
                    <ProgressBar
                        progress={opponentHealth}
                        color={ProgressBarColors.Red}
                        text={`${opponentHealth}/100`}
                        className={styles.health}
                    />

                    <GamesStatistics
                        won={opponent.statistics.wonGames}
                        all={opponent.statistics.allGames}
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
                        won={player.statistics.wonGames}
                        all={player.statistics.allGames}
                        className={styles.games}
                    />

                    <ProfileInfo
                        avatar={player.avatar}
                        nickname={player.nickname}
                    />

                    <ProgressBar
                        progress={playerHealth}
                        color={ProgressBarColors.Purple}
                        text={`${playerHealth}/100`}
                        reversed={true}
                        className={styles.health}
                    />
                </div>
            )}

            {!isTutorialMode && (
                <CrossButton
                    className={styles.quit}
                    onClick={handleQuitClick}
                />
            )}
        </header>
    )
}
