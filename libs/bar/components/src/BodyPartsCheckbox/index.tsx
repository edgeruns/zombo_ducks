import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors, MAX_ATTACK_COUNT, MAX_DEFENDE_COUNT } from '@apps/bar/data'

import styles from './BodyPartsCheckbox.module.scss'

export const BodyPartsCheckbox: FC = () => {
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const playerAttacks = useSelector(selectors.getPlayerAttacks)
    const playerDefences = useSelector(selectors.getPlayerDefences)

    const isVisible = isRoundScene || isRoundFinishScene

    const maxCount = new Array(MAX_ATTACK_COUNT + MAX_DEFENDE_COUNT).fill(null)
    const selectedCount = playerAttacks.length + playerDefences.length

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    return (
        <div className={rootClassName}>
            {maxCount.map((_, index) => {
                const selected = index + 1 <= selectedCount

                const pointClassName = classNames(
                    styles.point,
                    selected && styles.point_selected
                )

                return (
                    <div
                        key={index}
                        className={pointClassName}
                    />
                )
            })}
        </div>
    )
}
