import React, { FC, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import {
    AppDispatch,
    Mode,
    slice,
    selectors,
} from '@apps/games-zombofighter-client-data'
import {
    isAudioDisabled,
    toggleAudio,
} from '@apps/games-zombofighter-client-utils'

import { SoundToggle } from './SoundToggle'
import { Tutorial } from './Tutorial'

import styles from './Menu.module.scss'

export const Menu: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const isStartScene = useSelector(selectors.isStartScene)

    const [audioDisabled, setAudioDisabled] = useState(isAudioDisabled())

    const rootClassName = classNames(
        styles.root,
        isStartScene && styles.root_visible
    )

    const handleSoundToggle = useCallback(() => {
        setAudioDisabled(toggleAudio())
    }, [])

    const handleTutorialClick = useCallback(() => {
        dispatch(slice.actions.setMode(Mode.Tutorial))
    }, [dispatch])

    return (
        <div className={rootClassName}>
            <div className={styles.item}>
                <SoundToggle
                    audioDisabled={audioDisabled}
                    onClick={handleSoundToggle}
                />
            </div>

            <div className={styles.item}>
                <Tutorial onClick={handleTutorialClick} />
            </div>
        </div>
    )
}
