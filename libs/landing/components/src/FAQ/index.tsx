import React, { FC } from 'react'

import { Row } from '../Row'
import { Section } from '../Section'

import { QUESTIONS } from './constants'
import { Question } from './Question'

import styles from './FAQ.module.scss'

export const FAQ: FC = () => {
    return (
        <Row>
            <Section
                id="faq"
                title="FAQ"
                className={styles.wrapper}
            >
                <div className={styles.content}>
                    {QUESTIONS.map((question, index) => (
                        <Question
                            key={index}
                            {...question}
                        />
                    ))}
                </div>
            </Section>
        </Row>
    )
}
