import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import {
    AppDispatch,
    slice,
    actions,
    selectors,
} from '@apps/games-zombofighter-client-data'
import { Sounds } from '@apps/games-zombofighter-client-utils'
import {
    GamesStatistics,
    ProfileInfo,
    Button,
    CrossButton,
} from '@apps/games-zombofighter-client-uikit'

import styles from './ResultPopup.module.scss'

export const ResultPopup: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const isGameFinishScene = useSelector(selectors.isGameFinishScene)
    const player = useSelector(selectors.getPlayer)
    const profit = useSelector(selectors.getGameProfit)
    const isGameVictory = useSelector(selectors.isGameVictory)
    const isGameLose = useSelector(selectors.isGameLose)

    const title = isGameVictory ? 'VICTORY!' : 'LOSE'
    const profitText = isGameVictory ? `+ ${profit}` : profit

    const rootClassName = classNames(
        styles.root,
        isGameLose && styles.root_lose,
        isGameVictory && styles.root_victory,
        isGameFinishScene && styles.root_visible
    )

    const handleTryAgainClick = useCallback(() => {
        dispatch(actions.startSearch())
    }, [dispatch])

    const handleCrossClick = useCallback(() => {
        dispatch(slice.actions.reset())
    }, [dispatch])

    return (
        <div className={rootClassName}>
            <h2 className={styles.title}>{title}</h2>

            {player && (
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
            )}

            <div className={styles.profit}>{profitText}</div>

            <Button
                className={styles.button}
                sound={Sounds.Laugh}
                onClick={handleTryAgainClick}
            >
                TRY AGAIN
            </Button>

            <CrossButton className={styles.close} onClick={handleCrossClick} />
        </div>
    )
}
