import React, { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors } from '@apps/bar/data'

import styles from './RoundText.module.scss'

export const RoundText: FC = () => {
    const isRoundScene = useSelector(selectors.isRoundScene)
    const roundNum = useSelector(selectors.getRoundsNum)

    const [isVisible, setIsVisible] = useState(false)

    const text = roundNum === 1 ? 'VS' : `Round ${roundNum}`

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    useEffect(() => {
        setIsVisible(isRoundScene)
    }, [isRoundScene])

    useEffect(() => {
        if (isVisible) {
            setTimeout(setIsVisible, 2000, false)
        }
    }, [isVisible])

    return (
        <div className={rootClassName}>
            <span className={styles.text}>
                {text}
            </span>
        </div>
    )
}
