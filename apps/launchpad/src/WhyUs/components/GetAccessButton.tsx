import React from 'react'
import styles from './GetAccessButton.module.scss'
import classnames from 'classnames/bind'

const cn = classnames.bind(styles)

export const GetAccessButton = () => {
    return (
        <div className={cn('wrapper')}>
            <div className={cn('btn')}>Get access</div>
        </div>
    )
}
