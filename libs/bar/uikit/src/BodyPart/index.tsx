import React, { FC, useCallback } from 'react'
import classNames from 'classnames'

import { BodyParts } from '@apps/bar/data'

import styles from './BodyPart.module.scss'

import shieldSrc from './assets/shield.png'
import hitSrc from './assets/hit.png'

const iconsSrc: Record<Icons, string> = {
    'shield': shieldSrc,
    'hit': hitSrc
}

type Icons = 'shield' | 'hit'

type BodyPartProps = {
    img: string
    part: BodyParts
    icon: Icons
    selected: boolean
    defended: boolean
    damaged: boolean
    disabled: boolean
    darked: boolean
    reversed?: boolean
    className?: string
    onToggle: (part: BodyParts) => void
}

export const BodyPart: FC<BodyPartProps> = props => {
    const {
        img,
        part,
        icon,
        selected,
        defended,
        damaged,
        darked,
        disabled,
        reversed = false,
        className,
        onToggle
    } = props

    const rootClassName = classNames(
        styles.root,
        className,
        reversed && styles.root_reversed,
        selected && styles.root_selected,
        defended && styles.root_defended,
        damaged && styles.root_damaged,
        darked && styles.root_darked,
        disabled && styles.root_disabled
    )

    const handleToggle = useCallback(() => {
        onToggle(part)
    }, [part, onToggle])

    return (
        <div
            className={rootClassName}
            onClick={handleToggle}
        >
            <img
                className={styles.img}
                src={img}
                alt={part}
            />

            <img
                className={styles.icon}
                src={iconsSrc[icon]}
                alt={icon}
            />
        </div>
    )
}
