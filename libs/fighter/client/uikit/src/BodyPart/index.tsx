import React, { FC } from 'react'
import classNames from 'classnames'

import hitSrc from './assets/hit.png'
import shieldSrc from './assets/shield.png'
import { Icons, Props } from './types'

import styles from './BodyPart.module.scss'

const iconsSrc: Record<Icons, string> = {
    shield: shieldSrc,
    hit: hitSrc,
}

export const BodyPart: FC<Props> = (props) => {
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
        onClick,
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

    return (
        <div className={rootClassName} onClick={onClick}>
            <img className={styles.img} src={img} alt={part} />

            {icon && (
                <img className={styles.icon} src={iconsSrc[icon]} alt={icon} />
            )}
        </div>
    )
}
