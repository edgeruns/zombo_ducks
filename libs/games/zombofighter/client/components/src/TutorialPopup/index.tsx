import React, { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import {
    AppDispatch,
    Mode,
    BodyParts,
    slice,
    selectors,
} from '@apps/games-zombofighter-client-data'
import { BodyPart, CrossButton } from '@apps/games-zombofighter-client-uikit'

import arrowSrc from './assets/arrow.svg'

import styles from './TutorialPopup.module.scss'

export const TutorialPopup: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const isTutorialMode = useSelector(selectors.isTutorialMode)
    const isStartScene = useSelector(selectors.isStartScene)

    const [activeScreen, setActiveScreen] = useState(0)

    const isVisible = isTutorialMode && isStartScene

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    const bodyPartsScreenClassName = classNames(
        styles.screen,
        activeScreen === 0 && styles.screen_visible
    )

    const roundsScreenClassName = classNames(
        styles.screen,
        activeScreen === 1 && styles.screen_visible
    )

    const arrowPrevClassName = classNames(
        styles.arrow,
        styles.arrow_prev,
        activeScreen === 0 && styles.arrow_hidden
    )

    const prevPointClassName = classNames(
        styles.point,
        activeScreen === 0 && styles.point_active
    )

    const nextPointClassName = classNames(
        styles.point,
        activeScreen === 1 && styles.point_active
    )

    const arrowNextClassName = classNames(
        styles.arrow,
        styles.arrow_next,
        activeScreen === 1 && styles.arrow_hidden
    )

    const handleArrowPrevClick = useCallback(() => {
        setActiveScreen((prev) => prev - 1)
    }, [])

    const handleArrowNextClick = useCallback(() => {
        setActiveScreen((prev) => prev + 1)
    }, [])

    const handleCrossClick = useCallback(() => {
        dispatch(slice.actions.setMode(Mode.Game))
    }, [dispatch])

    return (
        <div className={rootClassName}>
            <h2 className={styles.title}>Tutorial</h2>

            <div className={styles.screens}>
                <div className={bodyPartsScreenClassName}>
                    <span className={styles.text}>
                        You can attack one of your opponent's
                        <br />
                        body parts or defend yours.
                    </span>

                    <div className={styles['body-parts']}>
                        <BodyPart
                            img="/assets/head.png"
                            icon="hit"
                            size="s"
                            part={BodyParts.Head}
                            selected={true}
                            reversed={true}
                            disabled={true}
                        />

                        <BodyPart
                            img="/assets/torso.png"
                            size="s"
                            part={BodyParts.Torso}
                            selected={true}
                            reversed={true}
                            disabled={true}
                        />

                        <BodyPart
                            img="/assets/leg.png"
                            icon="shield"
                            size="s"
                            part={BodyParts.Torso}
                            selected={true}
                            disabled={true}
                            className={styles['body-part-leg']}
                        />
                    </div>
                </div>

                <div className={roundsScreenClassName}>
                    <span className={styles.text}>
                        The fighting consists of 5 rounds
                        <br />
                        10 seconds each.
                        <br />
                        You can make three moves in each round.
                        <br />
                    </span>
                </div>
            </div>

            <div className={styles.controls}>
                <img
                    className={arrowPrevClassName}
                    src={arrowSrc}
                    alt="Arrow"
                    onClick={handleArrowPrevClick}
                />

                <div className={styles.points}>
                    <div className={prevPointClassName} />
                    <div className={nextPointClassName} />
                </div>

                <img
                    className={arrowNextClassName}
                    src={arrowSrc}
                    alt="Arrow"
                    onClick={handleArrowNextClick}
                />
            </div>

            <CrossButton className={styles.close} onClick={handleCrossClick} />
        </div>
    )
}
