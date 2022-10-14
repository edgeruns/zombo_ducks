import { FC, PropsWithChildren } from 'react'

import styles from './HomePlayerWrapper.module.scss'

export const Wrapper: FC<PropsWithChildren> = props => {
    const { children } = props

    return (
        <div className={styles.root}>
            <div className={styles.player}>
                {children}
            </div>
        </div>
    )
}
