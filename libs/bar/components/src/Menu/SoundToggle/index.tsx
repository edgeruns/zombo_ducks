import React, { FC } from 'react'
import classNames from 'classnames'

import volumeSrc from './assets/volume.svg'

import styles from './MenuSoundToggle.module.scss'

type SoundToggleProps = {
    audioDisabled: boolean
    onClick: () => void
}

export const SoundToggle: FC<SoundToggleProps> = props => {
    const { audioDisabled, onClick } = props

    const rootClassName = classNames(
        styles.root,
        audioDisabled && styles.root_disabled
    )

    return (
        <div
            className={rootClassName}
            onClick={onClick}
        >
            <img
                className={styles.icon}
                src={volumeSrc}
                alt="Volume"
            />

            <div className={styles.line} />
        </div>
    )
}
