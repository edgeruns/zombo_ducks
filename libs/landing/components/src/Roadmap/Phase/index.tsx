import React, { FC } from 'react'

import styles from './Phase.module.scss'

const Border: FC = () => {
    return (
        <svg
            viewBox="0 0 360 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className={styles.border}
        >
            <rect x="1" y="1" width="358" height="318" rx="21" stroke="url(#paint0_linear_275_342)" strokeWidth="2"/>

            <defs>
                <linearGradient id="paint0_linear_275_342" x1="5.71428" y1="6.39068e-06" x2="442.271" y2="230.405" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8670D2"/>
                    <stop offset="0.526042" stopColor="#4A79E3"/>
                    <stop offset="1" stopColor="#12BFD7"/>
                </linearGradient>
            </defs>
        </svg>
    )
}

interface PhaseProps {
    name: string
    date: string
    items: string[]
}

export const Phase: FC<PhaseProps> = props => {
    const { name, date, items } = props

    return (
        <div className={styles.wrapper}>
            <Border />

            <div className={styles.head}>
                <h4 className={styles.name}>{name}</h4>
                <span className={styles.date}>{date}</span>
            </div>

            <ul className={styles.items}>
                {items.map((item, index) => (
                    <li
                        key={index}
                        className={styles.item}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
