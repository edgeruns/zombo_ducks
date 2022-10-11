import React, { FC } from 'react'
import classNames from 'classnames/bind'

import { Button } from '@apps/games-zombofighter-client-uikit'

import { Props } from './types'

import styles from './StartButton.module.scss'

const cx = classNames.bind(styles)

export const StartButton: FC<Props> = props => {
    const { isVisible, text, onClick } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    return (
        <Button
            className={rootClassName}
            onClick={onClick}
        >
            {text}
        </Button>
    )
}
