import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors } from '@apps/bar/data'
import { Duck } from '@apps/bar/uikit'

import styles from './Player.module.scss'

export const Player: FC = () => {
    const player = useSelector(selectors.getPlayer)
    const isGameStartScene = useSelector(selectors.isGameStartScene)
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const status = useSelector(selectors.getPlayerStatus)

    const isTurned = isGameStartScene || isRoundScene || isRoundFinishScene

    const rootClassName = classNames(
        styles.root,
        isTurned && styles['root_turned']
    )

    if (!player) {
        return null
    }

    return (
        <div className={rootClassName}>
            <Duck
                className={styles.duck}
                skin={player.skin}
                status={status}
            />
        </div>
    )
}
