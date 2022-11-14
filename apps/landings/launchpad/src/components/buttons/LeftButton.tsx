import React from 'react'
import classnames from 'classnames/bind'

import { ReactComponent as Slice } from './assets/sliceLeft.svg'

import styles from './LeftButton.module.scss'

const cn = classnames.bind(styles)

export const LeftButton = () => {
    return (
        <div className={cn('wrapper')}>
            <Slice className={cn('slice')} />
            <div className={cn('btn')}>Launch App</div>
        </div>
    )
}
