import React, { FC } from 'react'
import classNames from 'classnames'

import styles from './DuckAvatar.module.scss'

const Border: FC = () => {
    return (
        <svg
            viewBox="0 0 260 261"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.border}
        >
            <circle cx="130" cy="130.5" r="129.081" stroke="url(#paint0_linear_275_475)" strokeWidth="1.83746"/>

            <defs>
                <linearGradient id="paint0_linear_275_475" x1="4.12698" y1="0.500005" x2="334.525" y2="155.501" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#8670D2"/>
                    <stop offset="0.526042" stopColor="#4A79E3"/>
                    <stop offset="1" stopColor="#12BFD7"/>
                </linearGradient>
            </defs>
        </svg>

    )
}

interface DuckAvatarProps {
    name: string
    size?: 'm'
    className?: string
}

export const DuckAvatar: FC<DuckAvatarProps> = props => {
    const { name, size, className } = props

    const baseSrc = `/team/${name}`
    const webp = `${baseSrc}.webp`
    const jpg = `${baseSrc}.jpg`

    const wrapperClassName = classNames(
        styles.wrapper,
        className,
        size && styles[`wrapper_${size}`]
    )

    return (
        <div className={wrapperClassName}>
            <Border />

            <picture className={styles.img}>
                <source srcSet={webp} />
                <img src={jpg} alt={name} />
            </picture>
        </div>
    )
}
