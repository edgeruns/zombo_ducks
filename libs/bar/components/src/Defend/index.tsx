import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { BodyParts, selectors, slice } from '@apps/bar/data'
import { BodyPart } from '@apps/bar/uikit'

import { PARTS } from './constants'

import shieldSrc from './assets/shield.png'

import styles from './Defend.module.scss'

export const Defend: FC = () => {
    const dispatch = useDispatch()

    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const isMaxDefences = useSelector(selectors.isMaxDefences)
    const isDefendDisabled = useSelector(selectors.isDefendDisabled)

    const playerDefences = useSelector(selectors.getPlayerDefences)
    const playerDefended = useSelector(selectors.getPlayerDefendedParts)
    const playerDamaged = useSelector(selectors.getPlayerDamagedParts)

    const isVisible = isRoundScene || isRoundFinishScene

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    const iconClassName = classNames(
        styles.icon,
        isRoundScene && styles.icon_visible
    )

    const handleBodyPartToggle = useCallback((part: BodyParts) => {
        dispatch(slice.actions.defend(part))
    }, [dispatch])

    return (
        <div className={rootClassName}>
            <img
                className={iconClassName}
                src={shieldSrc}
                alt="Shield"
            />

            <div className={styles.parts}>
                {PARTS.map(part => {
                    const selected = playerDefences.includes(part.type) && !isRoundFinishScene
                    const defended = playerDefended.includes(part.type)
                    const damaged = playerDamaged.includes(part.type)
                    const disabled = isDefendDisabled || (isMaxDefences && !selected)
                    const darked = disabled && isRoundScene

                    return (
                        <BodyPart
                            key={part.type}
                            img={part.img}
                            part={part.type}
                            icon="shield"
                            selected={selected}
                            defended={defended}
                            damaged={damaged}
                            disabled={disabled}
                            darked={darked}
                            className={styles.part}
                            onToggle={handleBodyPartToggle}
                        />
                    )
                })}
            </div>
        </div>
    )
}
