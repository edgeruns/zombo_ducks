import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { UserSkins } from '@apps/games-zombofighter-client-data'
import { Duck } from '@apps/games-zombofighter-client-uikit'

import { Props } from './types'

import styles from './Player.module.scss'

const cx = classNames.bind(styles)

export const Player: FC<Props> = props => {
    const {
        isVisible,
        isTurned,
        skin = UserSkins.Default,
        status
    } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible,
        'root--turned': isTurned
    })

    return (
        <div className={rootClassName}>
            <Duck
                className={styles.duck}
                skin={skin}
                status={status}
            />
        </div>
    )
}
