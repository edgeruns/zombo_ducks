import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'

import styles from './Damages.module.scss'

const cx = classNames.bind(styles)

export const Damages: FC<Props> = props => {
    const { isVisible, values } = props

    const [opponentDamage, playerDamage] = values

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    return (
        <div className={rootClassName}>
            <span className={styles.value}>
                {opponentDamage}
            </span>

            <span className={styles.value}>
                {playerDamage}
            </span>
        </div>
    )
}
