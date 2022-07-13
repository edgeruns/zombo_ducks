import React, { FC } from 'react'
import classNames from 'classnames'

import questionSrc from './assets/question.svg'

import styles from './MenuTutorial.module.scss'

type TutorialProps = {
    onClick: () => void
}

export const Tutorial: FC<TutorialProps> = props => {
    const { onClick } = props

    return (
        <div
            className={styles.root}
            onClick={onClick}
        >
            <img
                className={styles.icon}
                src={questionSrc}
                alt="Question"
            />
        </div>
    )
}
