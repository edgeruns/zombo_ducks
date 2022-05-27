import React, { FC } from 'react'

import styles from './Background.module.scss'

export const Background: FC = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.item} />
            <div className={styles.item} />
            <div className={styles.item} />
            <div className={styles.item} />
        </div>
    )
}
