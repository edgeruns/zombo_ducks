import React from 'react'
import classnames from 'classnames/bind'

import styles from './GetAccessButton.module.scss'

const cn = classnames.bind(styles)

export const GetAccessButton = () => {
    return (
        <div className={cn('wrapper')}>
            <div className={cn('btn')}>Get access</div>
        </div>
    )
}
