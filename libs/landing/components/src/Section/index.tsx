import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'

import styles from './Section.module.scss'

interface SectionProps extends HTMLAttributes<HTMLElement> {
    title: string
}

export const Section: FC<SectionProps> = props => {
    const { title, className, children, ...restProps } = props

    const wrapperClassName = classNames(styles.wrapper, className)

    return (
        <section
            className={wrapperClassName}
            {...restProps}
        >
            <h2 className={styles.title}>
                {title}
            </h2>

            {children}
        </section>
    )
}
