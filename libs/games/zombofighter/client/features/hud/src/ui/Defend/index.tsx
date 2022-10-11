import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { BodyPart } from '@apps/games-zombofighter-client-uikit'

import { Props } from './types'
import { PARTS } from './constants'

import shieldSrc from './assets/shield.png'

import styles from './Defend.module.scss'

const cx = classNames.bind(styles)

export const Defend: FC<Props> = props => {
    const {
        isVisible,
        isIconVisible,
        selectedParts,
        defendedParts,
        damagedParts,
        disabledParts,
        darkedParts,
        onBodyPartClick
    } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    const iconClassName = cx('icon', {
        'icon--visible': isIconVisible
    })

    return (
        <div className={rootClassName}>
            <img className={iconClassName} src={shieldSrc} alt="Shield" />

            <div className={styles.parts}>
                {PARTS.map((part) => {
                    const isSelected = selectedParts.includes(part.type)
                    const isDefended = defendedParts.includes(part.type)
                    const isDamaged = damagedParts.includes(part.type)
                    const isDisabled = disabledParts.includes(part.type)
                    const isDarked = darkedParts.includes(part.type)

                    return (
                        <BodyPart
                            key={part.type}
                            img={part.img}
                            part={part.type}
                            icon="shield"
                            selected={isSelected}
                            defended={isDefended}
                            damaged={isDamaged}
                            disabled={isDisabled}
                            darked={isDarked}
                            className={styles.part}
                            onToggle={onBodyPartClick}
                        />
                    )
                })}
            </div>
        </div>
    )
}
