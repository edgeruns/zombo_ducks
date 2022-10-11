import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'

import hintArrowSrc from './assets/hint-arrow.svg'
import arrowSrc from './assets/arrow.svg'

import styles from './Tutorial.module.scss'

const cx = classNames.bind(styles)

const Arrow: FC = () => {
    return <img className={styles.arrow} src={arrowSrc} alt="Arrow" />
}

export const Tutorial: FC<Props> = props => {
    const {
        isVisible,
        isHintVisible,
        active,
        step,
        onHintClick
    } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    const hintClassName = cx('hint', {
        'hint--visible': isHintVisible
    })

    const firstStepArrowsClassName = cx('arrows', {
        'arrows--first': true,
        'arrows--visible': active === 0
    })

    const secondStepArrowsClassName = cx('arrows', {
        'arrows--second': true,
        'arrows--visible': active === 1
    })

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
                onClick={onHintClick}
            >
                <div className={styles['hint__text']}>
                    {step}
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
