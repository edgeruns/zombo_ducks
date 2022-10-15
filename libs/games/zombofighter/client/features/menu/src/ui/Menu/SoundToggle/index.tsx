import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'

import volumeSrc from './assets/volume.svg'

import styles from './MenuSoundToggle.module.scss'

const cx = classNames.bind(styles)

export const SoundToggle: FC<Props> = (props) => {
    const { disabled, onClick } = props

    const rootClassName = cx('root', {
        'root--disabled': disabled
    })

    return (
        <div className={rootClassName} onClick={onClick}>
            <img className={styles.icon} src={volumeSrc} alt="Volume" />

            <div className={styles.line} />
        </div>
    )
}
