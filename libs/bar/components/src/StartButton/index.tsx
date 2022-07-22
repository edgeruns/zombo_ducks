import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { AppDispatch, actions, selectors } from '@apps/bar/data'
import { Button } from '@apps/bar/uikit'
import { useTutorial, Sounds, playSound } from '@apps/bar/utils'

import styles from './StartButton.module.scss'

export const StartButton: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const { fakeStartSearch } = useTutorial()

    const isTutorialMode = useSelector(selectors.isTutorialMode)
    const isStartScene = useSelector(selectors.isStartScene)
    const player = useSelector(selectors.getPlayer)

    const isVisible = isStartScene && player

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    const handleClick = useCallback(() => {
        playSound(Sounds.StartSearching)

        if (isTutorialMode) {
            fakeStartSearch()
        } else {
            dispatch(actions.startSearch())
        }
    }, [dispatch, isTutorialMode, fakeStartSearch])

    return (
        <Button
            className={rootClassName}
            sound={null}
            onClick={handleClick}
        >
            START
        </Button>
    )
}
