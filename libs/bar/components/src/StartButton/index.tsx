import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { AppDispatch, actions, selectors } from '@apps/bar/data'
import { Button } from '@apps/bar/uikit'
import { useFakeActions } from '@apps/bar/utils'

import styles from './StartButton.module.scss'

export const StartButton: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const { fakeSearch } = useFakeActions()

    const isStartScene = useSelector(selectors.isStartScene)

    const rootClassName = classNames(
        styles.root,
        isStartScene && styles.root_visible
    )

    const handleClick = useCallback(() => {
        dispatch(actions.startSearch())
        fakeSearch()
    }, [dispatch, fakeSearch])

    return (
        <Button
            className={rootClassName}
            onClick={handleClick}
        >
            START
        </Button>
    )
}
