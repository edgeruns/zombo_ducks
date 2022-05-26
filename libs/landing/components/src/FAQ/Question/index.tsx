import React, { FC } from 'react'

import styles from './Question.module.scss'

const Border: FC = () => {
    return (
        <svg
            viewBox="0 0 360 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className={styles.border}
        >
            <rect x="0.918728" y="0.918728" width="358.163" height="118.163" rx="19.2933" stroke="url(#paint0_linear_275_335)" strokeWidth="1.83746"/>

            <defs>
                <linearGradient id="paint0_linear_275_335" x1="5.71428" y1="2.39651e-06" x2="192.966" y2="263.539" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8670D2"/>
                    <stop offset="0.526042" stopColor="#4A79E3"/>
                    <stop offset="1" stopColor="#12BFD7"/>
                </linearGradient>
            </defs>
        </svg>

    )
}

interface QuestionProps {
    title: string
    answer: string
}

export const Question: FC<QuestionProps> = props => {
    const { title, answer } = props

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                {title}
            </div>

            <div className={styles.answer}>
                <Border />
                {answer}
            </div>
        </div>
    )
}
