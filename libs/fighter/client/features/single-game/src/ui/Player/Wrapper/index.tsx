import { FC, PropsWithChildren } from 'react'

import styles from './SingleGamePlayerWrapper.module.scss'

export const Wrapper: FC<PropsWithChildren> = (props) => {
    const { children } = props

    return <div className={styles.root}>{children}</div>
}
