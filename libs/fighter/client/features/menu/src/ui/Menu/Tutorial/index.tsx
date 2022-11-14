import React, { FC } from 'react'

import questionSrc from './assets/question.svg'
import { Props } from './types'

import styles from './MenuTutorial.module.scss'

export const Tutorial: FC<Props> = (props) => {
    const { onClick } = props

    return (
        <div className={styles.root} onClick={onClick}>
            <img className={styles.icon} src={questionSrc} alt="Question" />
        </div>
    )
}
