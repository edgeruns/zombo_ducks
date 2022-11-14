import React, { FC } from 'react'

import { SoundToggle } from './SoundToggle'
import { Props } from './types'

import styles from './Menu.module.scss'

export const Menu: FC<Props> = (props) => {
    const { isSoundsDisabled, onSoundClick, onTutorialClick } = props

    return (
        <div className={styles.root}>
            <div className={styles.item}>
                <SoundToggle
                    disabled={isSoundsDisabled}
                    onClick={onSoundClick}
                />
            </div>

            {/*<div className={styles.item}>*/}
            {/*    <Tutorial onClick={onTutorialClick} />*/}
            {/*</div>*/}
        </div>
    )
}
