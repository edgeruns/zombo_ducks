import React, { FC, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { slice, selectors } from '@apps/bar/data'
import { useFakeActions } from '@apps/bar/utils'

import watchSrc from './assets/watch.svg'
import watchExpiredSrc from './assets/watch-expired.svg'

import styles from './Rounds.module.scss'

export const Rounds: FC = () => {
    const dispatch = useDispatch()

    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)

    const current = useSelector(selectors.getRoundsNum)
    const count = useSelector(selectors.getRoundsCount)
    const timeLeft = useSelector(selectors.getRoundTimeLeft)
    const isTimeExpired = useSelector(selectors.isRoundTimeExpired)

    const { fakeRoundFinish } = useFakeActions()

    const timeIntervalIdRef = useRef<NodeJS.Timer>()

    const isVisible = isRoundScene || isRoundFinishScene
    const stopTimer = isTimeExpired || isRoundFinishScene

    const text = `Round ${current}/${count}`

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    useEffect(() => {
        const timeIntervalId = timeIntervalIdRef.current

        if (stopTimer && timeIntervalId) {
            clearInterval(timeIntervalId)
        }
    }, [stopTimer])

    useEffect(() => {
        if (current > 0 && current <= count) {
            let time = timeLeft

            timeIntervalIdRef.current = setInterval(() => {
                dispatch(slice.actions.setTimeLeft(--time))
            }, 1000)
        }
    }, [dispatch, current, count])

    useEffect(() => {
        if (isTimeExpired && isRoundScene) {
            fakeRoundFinish()
        }
    }, [isTimeExpired, isRoundScene, fakeRoundFinish])

    return (
        <div className={rootClassName}>
            <span className={styles.text}>
                {text}
            </span>

            <div className={styles.watch}>
                <img
                    className={styles.watch__icon}
                    src={isTimeExpired ? watchExpiredSrc : watchSrc}
                    alt="Watch"
                />

                <span className={styles.watch__text}>
                    {timeLeft}
                </span>
            </div>
        </div>
    )
}
