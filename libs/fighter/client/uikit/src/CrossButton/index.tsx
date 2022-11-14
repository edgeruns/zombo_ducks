import React, { ButtonHTMLAttributes,FC, MouseEvent, useCallback } from 'react'
import { playSound,Sounds } from '@apps/fighter/client/features/shared/sounds'
import classNames from 'classnames'

import crossSrc from './assets/cross.svg'

import styles from './CrossButton.module.scss'

type CrossButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    sound?: Sounds
}

export const CrossButton: FC<CrossButtonProps> = (props) => {
    const { sound = Sounds.Button, className, onClick, ...restProps } = props

    const rootClassName = classNames(styles.root, className)

    const handleClick = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            if (sound) {
                playSound(sound, true)
            }

            onClick && onClick(event)
        },
        [sound, onClick]
    )

    return (
        <button className={rootClassName} onClick={handleClick} {...restProps}>
            <img className={styles.icon} src={crossSrc} alt="Cross" />
        </button>
    )
}
