import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'

import styles from './RoundGreeting.module.scss'

const cx = classNames.bind(styles)

export const RoundGreeting: FC<Props> = props => {
    const { isVisible, text } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    return (
        <div className={rootClassName}>
            <span className={styles.text}>{text}</span>
        </div>
    )
}
