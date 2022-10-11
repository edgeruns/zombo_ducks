import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import * as selectors from '../../data/selectors'
import { Player } from '../../ui'

export const PlayerContainer: FC = () => {
    const isVisible = useSelector(selectors.isVisible)
    const isTurned = useSelector(selectors.isTurned)
    const skin = useSelector(selectors.getSkin)
    const status = useSelector(selectors.getStatus)

    return (
        <Player
            isVisible={isVisible}
            isTurned={isTurned}
            skin={skin}
            status={status}
        />
    )
}
