import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { Props, Skins, Status } from './types'

import styles from './Duck.module.scss'

const cx = classNames.bind(styles)

export const Duck: FC<Props> = (props) => {
    const {
        skin = Skins.Default,
        status = Status.Normal,
        className,
    } = props

    const rootClassName = cx(
        'root',
        className,
        `root--skin-${skin}`,
        `root--status-${status}`,
    )

    return <div className={rootClassName} />
}
