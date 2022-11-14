import { FC } from 'react'
import { useSelector } from 'react-redux'
import user from '@apps/fighter/client/features/shared/user'

import { Player } from '../../ui'

export const ResultPlayerContainer: FC = () => {
    const player = useSelector(user.selectors.getUser)

    return player && <Player skin={player.skin} status="normal" />
}
