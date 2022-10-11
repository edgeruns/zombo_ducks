import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'
import { SoundToggle } from './SoundToggle'
import { Tutorial } from './Tutorial'

import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

export const Menu: FC<Props> = props => {
    const {
        isVisible,
        isSoundsDisabled,
        onSoundClick,
        onTutorialClick
    } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    return (
        <div className={rootClassName}>
            <div className={styles.item}>
                <SoundToggle
                    disabled={isSoundsDisabled}
                    onClick={onSoundClick}
                />
            </div>

            <div className={styles.item}>
                <Tutorial onClick={onTutorialClick} />
            </div>
        </div>
    )
}
