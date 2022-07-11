import React, { FC, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors } from '@apps/bar/data'
import { isAudioDisabled, toggleAudio } from '@apps/bar/utils'

import { SoundToggle } from './SoundToggle'

import styles from './Menu.module.scss'

export const Menu: FC = () => {
    const isStartScene = useSelector(selectors.isStartScene)

    const [audioDisabled, setAudioDisabled] = useState(isAudioDisabled())

    const rootClassName = classNames(
        styles.root,
        isStartScene && styles.root_visible
    )

    const handleSoundToggle = useCallback(() => {
        setAudioDisabled(toggleAudio())
    }, [])

    return (
        <div className={rootClassName}>
            <SoundToggle
                audioDisabled={audioDisabled}
                onClick={handleSoundToggle}
            />
        </div>
    )
}
