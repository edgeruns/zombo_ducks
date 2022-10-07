import React, { FC, useCallback } from 'react'
import classNames from 'classnames'

import { BodyParts } from '@apps/games-zombofighter-client-data'

import styles from './BodyPart.module.scss'

import shieldSrc from './assets/shield.png'
import hitSrc from './assets/hit.png'

const iconsSrc: Record<Icons, string> = {
    shield: shieldSrc,
    hit: hitSrc,
}

type Icons = 'shield' | 'hit'

type BodyPartProps = {
    img: string
    part: BodyParts
    icon?: Icons
    size?: 's' | 'm'
    selected?: boolean
    defended?: boolean
    damaged?: boolean
    disabled?: boolean
    darked?: boolean
    reversed?: boolean
    className?: string
    onToggle?: (part: BodyParts) => void
}

export const BodyPart: FC<BodyPartProps> = (props) => {
    const {
        img,
        part,
        icon,
        size = 'm',
        selected = false,
        defended = false,
        damaged = false,
        darked = false,
        disabled = false,
        reversed = false,
        className,
        onToggle,
    } = props

    const rootClassName = classNames(
        styles.root,
        className,
        styles[`root_size-${size}`],
        reversed && styles.root_reversed,
        selected && styles.root_selected,
        defended && styles.root_defended,
        damaged && styles.root_damaged,
        darked && styles.root_darked,
        disabled && styles.root_disabled
    )

    const handleToggle = useCallback(() => {
        onToggle && onToggle(part)
    }, [part, onToggle])

    return (
        <div className={rootClassName} onClick={handleToggle}>
            <img className={styles.img} src={img} alt={part} />

            {icon && (
                <img className={styles.icon} src={iconsSrc[icon]} alt={icon} />
            )}
        </div>
    )
}
