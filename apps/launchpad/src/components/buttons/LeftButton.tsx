import React, { useState } from 'react'
import styles from './LeftButton.module.scss'
import classnames from 'classnames/bind'
import { ReactComponent as Slice } from './assets/sliceLeft.svg'

const cn = classnames.bind(styles)

export const LeftButton = () => {
    return (
        <div className={cn('wrapper')}>
            <Slice className={cn('slice')} />
            <div className={cn('btn')}>Launch App</div>
        </div>
    )
}
