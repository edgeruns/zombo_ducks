import React, { FC, PropsWithChildren } from 'react'

import { Button } from '@apps/games-zombofighter-client-uikit'

import { Props } from './types'

import styles from './StartGameButton.module.scss'

export const StartButton: FC<PropsWithChildren<Props>> = props => {
    const { children, onClick } = props

    return (
        <Button
            className={styles.root}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}
