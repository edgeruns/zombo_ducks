import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { AppDispatch, slice, actions, selectors } from '@apps/bar/data'
import { useFakeActions } from '@apps/bar/utils'
import { GamesStatistics, ProfileInfo, Button, CrossButton } from '@apps/bar/uikit'

import styles from './ResultPopup.module.scss'

export const ResultPopup: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const { fakeSearch } = useFakeActions()

    const isGameFinishScene = useSelector(selectors.isGameFinishScene)
    const player = useSelector(selectors.getPlayer)
    const profit = useSelector(selectors.getGameProfit)
    const isVictory = useSelector(selectors.isVictory)
    const isLose = useSelector(selectors.isLose)

    const title = isVictory ? 'VICTORY' : 'LOSE'
    const profitText = isVictory ? `+ ${profit}` : profit

    const rootClassName = classNames(
        styles.root,
        isLose && styles.root_lose,
        isVictory && styles.root_victory,
        isGameFinishScene && styles.root_visible,
    )

    const handleTryAgainClick = useCallback(() => {
        dispatch(actions.startSearch())
        fakeSearch()
    }, [dispatch, fakeSearch])

    const handleCrossClick = useCallback(() => {
        dispatch(slice.actions.reset())
    }, [dispatch])

    return (
        <div className={rootClassName}>
            <h2 className={styles.title}>
                {title}
            </h2>

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

            <div className={styles.profit}>
                {profitText}
            </div>

            <Button
                className={styles.button}
                onClick={handleTryAgainClick}
            >
                TRY AGAIN
            </Button>

            <CrossButton
                className={styles.close}
                onClick={handleCrossClick}
            />
        </div>
    )
}
