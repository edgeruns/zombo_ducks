import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors } from '@apps/games-zombofighter-client-data'
import { Duck } from '@apps/games-zombofighter-client-uikit'

import styles from './Player.module.scss'

export const Player: FC = () => {
    const player = useSelector(selectors.getPlayer)
    const isTutorialMode = useSelector(selectors.isTutorialMode)
    const isGameStartScene = useSelector(selectors.isGameStartScene)
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const status = useSelector(selectors.getPlayerStatus)

    const isTurned =
        isTutorialMode || isGameStartScene || isRoundScene || isRoundFinishScene

    const rootClassName = classNames(
        styles.root,
        isTurned && styles.root_turned,
        player && styles.root_visible
    )

    return (
        <div className={rootClassName}>
            {player && (
                <Duck
                    className={styles.duck}
                    skin={player.skin}
                    status={status}
                />
            )}
        </div>
    )
}
