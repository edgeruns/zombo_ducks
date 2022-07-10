import React, { FC, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = props => {
    const { className, children, ...restProps } = props

    const rootClassName = classNames(styles.root, className)

    return (
        <button
            className={rootClassName}
            {...restProps}
        >
            {children}
        </button>
    )
}
