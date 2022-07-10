import React, { FC, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'

import crossSrc from './assets/cross.svg'

import styles from './CrossButton.module.scss'

type CrossButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const CrossButton: FC<CrossButtonProps> = props => {
    const { className, ...restProps } = props

    const rootClassName = classNames(
        styles.root,
        className
    )

    return (
        <button
            className={rootClassName}
            {...restProps}
        >
            <img
                className={styles.icon}
                src={crossSrc}
                alt="Cross"
            />
        </button>
    )
}
