import React, { FC } from 'react'
import { Button } from '@apps/fighter/client/uikit'
import classNames from 'classnames/bind'

import { Props } from './types'

import styles from './ActionButton.module.scss'

const cx = classNames.bind(styles)

export const ActionButton: FC<Props> = (props) => {
    const { isVisible, isDisabled, text, onClick } = props

    const rootClassName = cx('root', {
        'root--visible': isVisible,
    })

    return (
        <Button
            className={rootClassName}
            disabled={isDisabled}
            onClick={onClick}
        >
            {text}
        </Button>
    )
}
