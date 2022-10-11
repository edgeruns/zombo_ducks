import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { UserSkins } from '@apps/games-zombofighter-client-data'
import { Duck } from '@apps/games-zombofighter-client-uikit'

import { Props } from './types'

import styles from './Opponent.module.scss'

const cx = classNames.bind(styles)

export const Opponent: FC<Props> = props => {
    const {
        isVisible,
        isArrived,
        skin = UserSkins.Default,
        status
    } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible,
        'root--arrived': isArrived
    })

    return (
        <div className={rootClassName}>
            <Duck
                skin={skin}
                status={status}
                className={styles.duck}
            />
        </div>
    )
}
