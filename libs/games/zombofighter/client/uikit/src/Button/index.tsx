import React, { FC, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

import { Sounds } from '@apps/games/zombofighter/client/features/shared/sounds'

import styles from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: 's' | 'm'
    color?: 'yellow' | 'red'
    sound?: Sounds
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        size = 'm',
        color = 'yellow',
        className,
        children,
        ...restProps
    } = props

    const rootClassName = classNames(
        styles.root,
        className,
        styles[`root_color-${color}`],
        styles[`root_size-${size}`]
    )

    return (
        <button
            className={rootClassName}
            {...restProps}
        >
            {children}
        </button>
    )
}
