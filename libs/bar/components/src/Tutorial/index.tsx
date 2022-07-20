import React, { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors, slice } from '@apps/bar/data'

import { STEPS } from './constants'

import hintArrowSrc from './assets/hint-arrow.svg'
import arrowSrc from './assets/arrow.svg'

import styles from './Tutorial.module.scss'

const Arrow: FC = () => {
    return (
        <img
            className={styles.arrow}
            src={arrowSrc}
            alt="Arrow"
        />
    )
}

export const Tutorial: FC = () => {
    const dispatch = useDispatch()

    const [activeIndex, setActiveIndex] = useState(0)

    const isTutorialMode = useSelector(selectors.isTutorialMode)
    const isGameStartScene = useSelector(selectors.isGameStartScene)
    const isRoundScene = useSelector(selectors.isRoundScene)
    const isRoundFinishScene = useSelector(selectors.isRoundFinishScene)
    const isRoundTimeExpired = useSelector(selectors.isRoundTimeExpired)

    const isArrive = isTutorialMode && isGameStartScene
    const isVisible = isTutorialMode && (isRoundScene || isRoundFinishScene)

    const rootClassName = classNames(
        styles.root,
        isArrive && styles.root_arrive,
        isVisible && styles.root_visible
    )

    const hintClassName = classNames(
        styles.hint,
        !isRoundScene && styles.hint_visible
    )

    const firstStepArrowsClassName = classNames(
        styles.arrows,
        styles.arrows_first,
        activeIndex === 0 && styles.arrows_visible
    )

    const secondStepArrowsClassName = classNames(
        styles.arrows,
        styles.arrows_second,
        activeIndex === 1 && styles.arrows_visible
    )

    const handleHintClick = useCallback(() => {
        const isLast = activeIndex + 1 >= STEPS.length

        if (isLast) {
            dispatch(slice.actions.reset())
        } else if (activeIndex === 2) {
            dispatch(slice.actions.startTutorialRound())
        } else {
            setActiveIndex(activeIndex + 1)
        }
    }, [dispatch, activeIndex])

    useEffect(() => {
        if (isRoundTimeExpired) {
            setActiveIndex(prev => prev + 1)

            dispatch(slice.actions.startTutorialRoundFinish())
        }
    }, [dispatch, isRoundTimeExpired])

    return (
        <div className={rootClassName}>
            <div className={firstStepArrowsClassName}>
                <Arrow />
            </div>

            <div className={secondStepArrowsClassName}>
                <div className={styles.left}>
                    <Arrow />
                    <Arrow />
                    <Arrow />
                </div>

                <div className={styles.right}>
                    <Arrow />
                    <Arrow />
                    <Arrow />
                </div>
            </div>

            <div
                className={hintClassName}
                onClick={handleHintClick}
            >
                <div className={styles['hint__text']}>
                    {STEPS[activeIndex]}
                </div>

                <img
                    className={styles['hint__arrow']}
                    src={hintArrowSrc}
                    alt="Arrow"
                />
            </div>
        </div>
    )
}
