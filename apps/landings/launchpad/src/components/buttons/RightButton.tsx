import React, { useState } from 'react'
import classnames from 'classnames/bind'

import { ReactComponent as Slice } from './assets/sliceRight.svg'

import styles from './RightButton.module.scss'

const cn = classnames.bind(styles)

export const RightButton = () => {
    return (
        <div className={cn('wrapper')}>
            <Slice className={cn('slice')} />
            <div className={cn('btn')}>Apply for listing</div>
        </div>
    )
}
