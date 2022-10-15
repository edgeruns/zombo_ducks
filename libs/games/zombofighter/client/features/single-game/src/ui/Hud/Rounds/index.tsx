import React, { FC} from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'

import watchSrc from './assets/watch.svg'
import watchExpiredSrc from './assets/watch-expired.svg'

import styles from './Rounds.module.scss'

const cx = classNames.bind(styles)

export const Rounds: FC<Props> = props => {
    const {
        isVisible,
        isWatchBlinking,
        isWatchExpired,
        time,
        current,
        count
    } = props

    const text = `Round ${current}/${count}`

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    const watchClassName = cx('watch', {
        'watch--blinking': isWatchBlinking
    })

    return (
        <div className={rootClassName}>
            <span className={styles.text}>{text}</span>

            <div className={watchClassName}>
                <img
                    className={styles.watch__icon}
                    src={isWatchExpired ? watchExpiredSrc : watchSrc}
                    alt="Watch"
                />

                <span className={styles.watch__text}>
                    {time}
                </span>
            </div>
        </div>
    )
}
