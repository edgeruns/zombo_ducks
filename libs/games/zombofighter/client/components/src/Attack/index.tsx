import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import {
    BodyParts,
    selectors,
    slice,
} from '@apps/games-zombofighter-client-data'
import { Sounds, playSound } from '@apps/games-zombofighter-client-utils'
import { BodyPart } from '@apps/games-zombofighter-client-uikit'

import { PARTS } from './constants'

import hitSrc from './assets/hit.png'

import styles from './Attack.module.scss'

export const Attack: FC = () => {
    const dispatch = useDispatch()

    const isGameStartScene = useSelector(selectors.isGameStartScene)
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const isMaxAttacks = useSelector(selectors.isMaxAttacks)
    const isAttackDisabled = useSelector(selectors.isAttackDisabled)

    const playerAttacks = useSelector(selectors.getPlayerAttacks)
    const opponentDefended = useSelector(selectors.getOpponentDefendedParts)
    const opponentDamaged = useSelector(selectors.getOpponentDamagedParts)

    const isVisible = isRoundScene || isRoundFinishScene
    const isIconVisible = isGameStartScene || isRoundScene

    const rootClassName = classNames(
        styles.root,
        isGameStartScene && styles.root_arrive,
        isVisible && styles.root_visible
    )

    const iconClassName = classNames(
        styles.icon,
        isIconVisible && styles.icon_visible
    )

    const handleBodyPartToggle = useCallback(
        (part: BodyParts) => {
            const selected = playerAttacks.includes(part)

            if (!selected) {
                playSound(Sounds.Hit, true)
            }

            dispatch(slice.actions.attack(part))
        },
        [dispatch, playerAttacks]
    )

    return (
        <div className={rootClassName}>
            <img className={iconClassName} src={hitSrc} alt="Hit" />

            <div className={styles.parts}>
                {PARTS.map((part) => {
                    const selected =
                        playerAttacks.includes(part.type) && !isRoundFinishScene
                    const defended = opponentDefended.includes(part.type)
                    const damaged = opponentDamaged.includes(part.type)
                    const disabled =
                        isAttackDisabled || (isMaxAttacks && !selected)
                    const darked = disabled && isRoundScene

                    return (
                        <BodyPart
                            key={part.type}
                            img={part.img}
                            part={part.type}
                            icon="hit"
                            selected={selected}
                            defended={defended}
                            damaged={damaged}
                            disabled={disabled}
                            darked={darked}
                            reversed={true}
                            className={styles.part}
                            onToggle={handleBodyPartToggle}
                        />
                    )
                })}
            </div>
        </div>
    )
}
