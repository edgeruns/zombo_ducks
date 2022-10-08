import React, { FC, PropsWithChildren } from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'

import styles from './Row.module.scss'

const cx = classNames.bind(styles)

export const Row: FC<PropsWithChildren<Props>> = props => {
    const { className, children } = props

    const rootClassName = cx('root', className)

    return (
        <div className={rootClassName}>
            {children}
        </div>
    )
}
