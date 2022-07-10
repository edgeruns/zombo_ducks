import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors } from '@apps/bar/data'

import styles from './GamersDamage.module.scss'

export const GamersDamage: FC = () => {
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const playerDamage = useSelector(selectors.getPlayerDamage)
    const opponentDamage = useSelector(selectors.getOpponentDamage)

    const rootClassName = classNames(
        styles.root,
        isRoundFinishScene && styles.root_visible
    )

    return (
        <div className={rootClassName}>
            <span className={styles.damage}>
                {opponentDamage}
            </span>

            <span className={styles.damage}>
                {playerDamage}
            </span>
        </div>
    )
}
