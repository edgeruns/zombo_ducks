import React,  { FC, MouseEvent, ButtonHTMLAttributes, useCallback } from 'react'
import classNames from 'classnames'

import { Sounds, playSound } from '@apps/bar/utils'

import styles from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 's' | 'm'
    color?: 'yellow' | 'red'
    sound?: Sounds | null
}

export const Button: FC<ButtonProps> = props => {
    const {
        size = 'm',
        color = 'yellow',
        sound = Sounds.Button,
        className,
        children,
        onClick,
        ...restProps
    } = props

    const rootClassName = classNames(
        styles.root,
        className,
        styles[`root_color-${color}`],
        styles[`root_size-${size}`]
    )

    const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        if (sound) {
            playSound(sound, true)
        }

        onClick && onClick(event)
    }, [sound, onClick])

    return (
        <button
            className={rootClassName}
            onClick={handleClick}
            {...restProps}
        >
            {children}
        </button>
    )
}
