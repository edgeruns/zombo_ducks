import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors } from '@apps/games-zombofighter-client-data'
import { Duck } from '@apps/games-zombofighter-client-uikit'

import styles from './Opponent.module.scss'

export const Opponent: FC = () => {
    const opponent = useSelector(selectors.getOpponent)
    const isGameStartScene = useSelector(selectors.isGameStartScene)
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const status = useSelector(selectors.getOpponentStatus)

    const isVisible = isGameStartScene || isRoundScene || isRoundFinishScene

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible,
        isGameStartScene && styles.root_arrived
    )

    return (
        <div className={rootClassName}>
            {opponent && (
                <Duck
                    skin={opponent.skin}
                    status={status}
                    className={styles.duck}
                />
            )}
        </div>
    )
}
