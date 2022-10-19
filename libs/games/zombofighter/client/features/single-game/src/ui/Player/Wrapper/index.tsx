import { FC, PropsWithChildren } from 'react'

import { Props } from './types'

import styles from './SingleGamePlayerWrapper.module.scss'

export const Wrapper: FC<PropsWithChildren<Props>> = props => {
    const { children } = props

    return (
        <div className={styles.root}>
            {children}
        </div>
    )
}
