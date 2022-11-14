import React, { FC } from 'react'
import { Button } from '@apps/fighter/client/uikit'
import classNames from 'classnames/bind'

import { Props } from './types'

import styles from './QuitPopup.module.scss'

const cx = classNames.bind(styles)

export const QuitPopup: FC<Props> = (props) => {
    const { isVisible, onConfirmClick, onCancelClick } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible,
    })

    return (
        <div className={rootClassName}>
            <div className={styles.content}>
                <h2 className={styles.title}>Quit game?</h2>

                <div className={styles.text}>
                    Keep playing to beat the level and get a reward!
                </div>

                <div className={styles.buttons}>
                    <Button
                        size="s"
                        color="red"
                        className={styles.button}
                        onClick={onConfirmClick}
                    >
                        Quit
                    </Button>

                    <Button
                        size="s"
                        className={styles.button}
                        onClick={onCancelClick}
                    >
                        CONTINUE
                    </Button>
                </div>
            </div>
        </div>
    )
}
