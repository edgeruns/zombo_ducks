import React, { FC } from 'react'

import { Section } from '../Section'
import { Row } from '../Row'
import { Question } from './Question'
import { QUESTIONS } from './constants'

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
