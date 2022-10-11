import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'

import spinnerSvg from './assets/spinner.svg'
import styles from './Searching.module.scss'

const cx = classNames.bind(styles)

export const Searching: FC<Props> = props => {
    const { isVisible, text } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    return (
        <div className={rootClassName}>
            <img
                className={styles.spinner}
                src={spinnerSvg}
                alt="Spinner"
            />

            <span className={styles.text}>
                {text}
            </span>
        </div>
    )
}
