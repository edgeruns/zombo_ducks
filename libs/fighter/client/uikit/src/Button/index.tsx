import React, { ButtonHTMLAttributes,FC } from 'react'
import { Sounds } from '@apps/fighter/client/features/shared/sounds'
import classNames from 'classnames'

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
        <button className={rootClassName} {...restProps}>
            {children}
        </button>
    )
}
