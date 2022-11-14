import React, { FC } from 'react'
import { BodyPart } from '@apps/fighter/client/uikit'
import classNames from 'classnames/bind'

import hitSrc from './assets/hit.png'
import { PARTS } from './constants'
import { Props } from './types'

import styles from './Attack.module.scss'

const cx = classNames.bind(styles)

export const Attack: FC<Props> = (props) => {
    const {
        isVisible,
        isIconVisible,
        selectedParts,
        defendedParts,
        damagedParts,
        disabledParts,
        darkedParts,
        onBodyPartClick,
    } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible,
    })

    const iconClassName = cx('icon', {
        'icon--visible': isIconVisible,
    })

    return (
        <div className={rootClassName}>
            <img className={iconClassName} src={hitSrc} alt="Hit" />

            <div className={styles.parts}>
                {PARTS.map((part, index) => {
                    const isSelected = selectedParts[index] === 1
                    const isDefended = defendedParts[index] === 1
                    const isDamaged = damagedParts[index] === 1
                    const isDisabled = disabledParts[index] === 1
                    const isDarked = darkedParts[index] === 1

                    return (
                        <BodyPart
                            key={part.type}
                            img={part.img}
                            part={part.type}
                            icon="hit"
                            selected={isSelected}
                            defended={isDefended}
                            damaged={isDamaged}
                            disabled={isDisabled}
                            darked={isDarked}
                            reversed={true}
                            className={styles.part}
                            onClick={() => onBodyPartClick(index)}
                        />
                    )
                })}
            </div>
        </div>
    )
}
