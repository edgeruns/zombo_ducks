import React, { FC, MouseEvent, useCallback, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

import { Sounds, playSound } from '@apps/games/zombofighter/client/features/shared/sounds'

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
