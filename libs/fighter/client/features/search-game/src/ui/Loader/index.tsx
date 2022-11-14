import React, { FC } from 'react'

import spinnerSvg from './assets/spinner.svg'
import { Props } from './types'

import styles from './SearchGameLoader.module.scss'

export const Loader: FC<Props> = (props) => {
    const { text } = props

    return (
        <div className={styles.root}>
            <img className={styles.spinner} src={spinnerSvg} alt="Spinner" />

            <span className={styles.text}>{text}</span>
        </div>
    )
}
