import React, { useState } from 'react'
import styles from './RightButton.module.scss'
import classnames from 'classnames/bind'
import { ReactComponent as Slice } from './assets/sliceRight.svg'

const cn = classnames.bind(styles)

export const RightButton = () => {
    return (
        <div className={cn('wrapper')}>
            <Slice className={cn('slice')} />
            <div className={cn('btn')}>Apply for listing</div>
        </div>
    )
}
