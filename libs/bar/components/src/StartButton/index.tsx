import React, { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { selectors } from '@apps/bar/data'
import { Button } from '@apps/bar/uikit'
import { useFakeActions } from '@apps/bar/utils'

import styles from './StartButton.module.scss'

export const StartButton: FC = () => {
    const { fakeSearch } = useFakeActions()

    const isStartScene = useSelector(selectors.isStartScene)

    const rootClassName = classNames(
        styles.root,
        isStartScene && styles.root_visible
    )

    const handleClick = useCallback(() => {
        fakeSearch()
    }, [fakeSearch])

    return (
        <Button
            className={rootClassName}
            onClick={handleClick}
        >
            START
        </Button>
    )
}
