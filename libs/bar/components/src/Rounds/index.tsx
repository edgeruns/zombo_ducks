import React, { FC, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { slice, selectors } from '@apps/bar/data'
import { Sounds, playSound } from '@apps/bar/utils'

import watchSrc from './assets/watch.svg'
import watchExpiredSrc from './assets/watch-expired.svg'

import styles from './Rounds.module.scss'

export const Rounds: FC = () => {
    const dispatch = useDispatch()

    const isGameStartScene = useSelector(selectors.isGameStartScene)
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const isGameFinishScene = useSelector(selectors.isGameFinishScene)
    const isRoundStarted = useSelector(selectors.isRoundStarted)

    const current = useSelector(selectors.getRoundsNum)
    const count = useSelector(selectors.getRoundsCount)
    const timeLeft = useSelector(selectors.getRoundTimeLeft)
    const isTimeExpired = useSelector(selectors.isRoundTimeExpired)

    const timeIntervalIdRef = useRef<NodeJS.Timer>()

    const isVisible = isRoundScene || isRoundFinishScene
    const isWatchBlinking = timeLeft <= 3 && timeLeft >= 1
    const isWatchExpired = timeLeft <= 3
    const stopTimer = isTimeExpired || isRoundFinishScene || isGameFinishScene

    const text = `Round ${current}/${count}`

    const rootClassName = classNames(
        styles.root,
        isGameStartScene && styles.root_arrive,
        isVisible && styles.root_visible
    )

    const watchClassName = classNames(
        styles.watch,
        isWatchBlinking && styles.watch_blinking
    )

    useEffect(() => {
        const timeIntervalId = timeIntervalIdRef.current

        if (stopTimer && timeIntervalId) {
            clearInterval(timeIntervalId)
        }
    }, [stopTimer])

    useEffect(() => {
        if (isRoundStarted && current > 0 && current <= count) {
            let time = timeLeft

            timeIntervalIdRef.current = setInterval(() => {
                dispatch(slice.actions.setTimeLeft(--time))
            }, 1000)
        }
    }, [dispatch, current, count, isRoundStarted])

    useEffect(() => {
        if (timeLeft === 3) {
            playSound(Sounds.Timer, true)
        }
    }, [timeLeft])

    return (
        <div className={rootClassName}>
            <span className={styles.text}>
                {text}
            </span>

            <div className={watchClassName}>
                <img
                    className={styles.watch__icon}
                    src={isWatchExpired ? watchExpiredSrc : watchSrc}
                    alt="Watch"
                />

                <span className={styles.watch__text}>
                    {timeLeft}
                </span>
            </div>
        </div>
    )
}
