import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import * as selectors from '../../data/selectors'
import { Opponent } from '../../ui'

export const OpponentContainer: FC = () => {
    const isVisible = useSelector(selectors.isVisible)
    const isArrived = useSelector(selectors.isArrived)
    const skin = useSelector(selectors.getSkin)
    const status = useSelector(selectors.getStatus)

    return (
        <Opponent
            isVisible={isVisible}
            isArrived={isArrived}
            skin={skin}
            status={status}
        />
    )
}
