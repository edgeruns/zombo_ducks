import { FC, PropsWithChildren } from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'

import styles from './SingleGameEnemyWrapper.module.scss'

const cx = classNames.bind(styles)

export const Wrapper: FC<PropsWithChildren<Props>> = props => {
    const { arrive, children } = props

    const rootClassName = cx('root', {
        'root--arrive': arrive
    })

    return (
        <div className={rootClassName}>
            {children}
        </div>
    )
}
