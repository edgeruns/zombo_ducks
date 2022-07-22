import React, { FC, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import { AppDispatch, slice, actions, selectors } from '@apps/bar/data'
import { Button } from '@apps/bar/uikit'

import styles from './QuitPopup.module.scss'

export const QuitPopup: FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const isOpened = useSelector(selectors.isQuitPopupOpened)

    const rootClassName = classNames(
        styles.root,
        isOpened && styles.root_visible
    )

    const handleQuitClick = useCallback(() => {
        dispatch(actions.quitGame())
    }, [dispatch])

    const handleContinueClick = useCallback(() => {
        dispatch(slice.actions.setQuitPopupOpened(false))
    }, [dispatch])

    return (
        <div className={rootClassName}>
            <div className={styles.content}>
                <h2 className={styles.title}>
                    Quit game?
                </h2>

                <div className={styles.text}>
                    Keep playing to beat the level
                    and get a reward!
                </div>

                <div className={styles.buttons}>
                    <Button
                        size="s"
                        color="red"
                        className={styles.button}
                        onClick={handleQuitClick}
                    >
                        Quit
                    </Button>

                    <Button
                        size="s"
                        className={styles.button}
                        onClick={handleContinueClick}
                    >
                        CONTINUE
                    </Button>
                </div>
            </div>
        </div>
    )
}
