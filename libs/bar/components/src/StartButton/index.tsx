import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { AppDispatch, actions, selectors } from '@apps/bar/data'
import { Button } from '@apps/bar/uikit'
import { useFakeActions, Sounds, playSound } from '@apps/bar/utils'

import styles from './StartButton.module.scss'

export const StartButton: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const { fakeSearch } = useFakeActions()

    const isTutorialMode = useSelector(selectors.isTutorialMode)
    const isStartScene = useSelector(selectors.isStartScene)
    const player = useSelector(selectors.getPlayer)

    const isVisible = !isTutorialMode && isStartScene && player

    const rootClassName = classNames(
        styles.root,
        isVisible && styles.root_visible
    )

    const handleClick = useCallback(() => {
        playSound(Sounds.StartSearching)

        dispatch(actions.startSearch())
        fakeSearch()
    }, [dispatch, fakeSearch])

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
