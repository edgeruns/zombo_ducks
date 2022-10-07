import React, { FC } from 'react'
import classNames from 'classnames'

import { UserSkins, UserStatus } from '@apps/games-zombofighter-client-data'

import styles from './Duck.module.scss'

type DuckProps = {
    skin?: UserSkins
    status?: UserStatus
    className?: string
}

export const Duck: FC<DuckProps> = (props) => {
    const {
        skin = UserSkins.Default,
        status = UserStatus.Normal,
        className,
    } = props

    const rootClassName = classNames(
        styles.root,
        className,
        styles[`root_skin-${skin}`],
        styles[`root_status-${status}`]
    )

    return <div className={rootClassName} />
}
