import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { BodyParts } from '@apps/games-zombofighter-client-data'
import { BodyPart, CrossButton } from '@apps/games-zombofighter-client-uikit'

import { Props } from './types'

import arrowSrc from './assets/arrow.svg'

import styles from './TutorialPopup.module.scss'

const cx = classNames.bind(styles)

export const Popup: FC<Props> = props => {
    const {
        isVisible,
        screenIndex,
        onPrevClick,
        onNextClick,
        onCrossClick
    } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    const bodyPartsScreenClassName = cx('screen', {
        'screen--visible': screenIndex === 0
    })

    const roundsScreenClassName = cx('screen', {
        'screen--visible': screenIndex === 1
    })

    const arrowPrevClassName = cx('arrow', {
        'arrow--prev': true,
        'arrow--hidden': screenIndex === 0
    })

    const arrowNextClassName = cx('arrow', {
        'arrow--next': true,
        'arrow--hidden': screenIndex === 1
    })

    const prevPointClassName = cx('point', {
        'point--active': screenIndex === 0
    })

    const nextPointClassName = cx('point', {
        'point--active': screenIndex === 1
    })

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
                    onClick={onPrevClick}
                />

                <div className={styles.points}>
                    <div className={prevPointClassName} />
                    <div className={nextPointClassName} />
                </div>

                <img
                    className={arrowNextClassName}
                    src={arrowSrc}
                    alt="Arrow"
                    onClick={onNextClick}
                />
            </div>

            <CrossButton className={styles.close} onClick={onCrossClick} />
        </div>
    )
}
