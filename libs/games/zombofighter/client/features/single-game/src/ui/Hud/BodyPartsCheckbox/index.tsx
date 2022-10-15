import React, { FC, useMemo } from 'react'
import classNames from 'classnames/bind'

import { Props } from './types'

import styles from './BodyPartsCheckbox.module.scss'

const cx = classNames.bind(styles)

export const BodyPartsCheckbox: FC<Props> = props => {
    const { isVisible, maxCount, selectedCount } = props

    const points = useMemo(() => new Array(maxCount).fill(null), [maxCount])

    const rootClassName = cx('root', {
        'root--visible': isVisible
    })

    return (
        <div className={rootClassName}>
            {points.map((_, index) => {
                const selected = index + 1 <= selectedCount

                const pointClassName = cx('point', {
                    'point--selected': selected
                })

                return <div key={index} className={pointClassName} />
            })}
        </div>
    )
}
