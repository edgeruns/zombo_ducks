import React, { FC, CSSProperties, useMemo } from 'react'
import classNames from 'classnames'

import styles from './ProgressBar.module.scss'

export enum ProgressBarColors {
    Red = 'red',
    Purple = 'purple'
}

type ProgressBarProps = {
    progress: number
    color: ProgressBarColors
    text?: string
    reversed?: boolean
    className?: string
}

export const ProgressBar: FC<ProgressBarProps> = props => {
    const { progress, color, text, reversed = false, className } = props

    const rootClassName = classNames(
        styles.root,
        className,
        reversed && styles.root_reversed,
        color === ProgressBarColors.Red && styles.root_red,
        color === ProgressBarColors.Purple && styles.root_purple,
    )

    const lineStyles = useMemo(() => {
        return {
            width: `${progress}%`
        } as CSSProperties
    }, [progress])

    return (
        <div className={rootClassName}>
            <div
                className={styles.line}
                style={lineStyles}
            />

            {text && (
                <span className={styles.text}>{text}</span>
            )}
        </div>
    )
}
