import { FC } from 'react'
import { Duck } from '@apps/fighter/client/uikit'

import { Props } from './types'

import styles from './SearchGamePlayer.module.scss'

export const Player: FC<Props> = (props) => {
    const { skin } = props

    return (
        <div className={styles.root}>
            <Duck skin={skin} className={styles.player} />
        </div>
    )
}
