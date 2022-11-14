import { FC, PropsWithChildren } from 'react'
import { Duck } from '@apps/fighter/client/uikit'

import { Props } from './types'

import styles from './ResultPlayer.module.scss'

export const Player: FC<PropsWithChildren<Props>> = (props) => {
    const { skin, status } = props

    return (
        <div className={styles.root}>
            <div className={styles.player}>
                <Duck skin={skin} status={status} />
            </div>
        </div>
    )
}
