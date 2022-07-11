import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors } from '@apps/bar/data'
import { Sounds, playSound } from '@apps/bar/utils'

import spinnerSvg from './assets/spinner.svg'

import styles from './Searching.module.scss'

export const Searching: FC = () => {
    const isSearchingScene = useSelector(selectors.isSearchingScene)

    const rootClassName = classNames(
        styles.root,
        isSearchingScene && styles.root_visible
    )

    useEffect(() => {
        if (isSearchingScene) {
            playSound(Sounds.Searching)
        }
    }, [isSearchingScene])

    return (
        <div className={rootClassName}>
            <img
                src={spinnerSvg}
                className={styles.spinner}
                alt="Spinner"
            />

            <span className={styles.text}>
                Search for opponent
            </span>
        </div>
    )
}
