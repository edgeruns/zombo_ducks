import { FC } from 'react'
import { useSelector } from 'react-redux'

import { Duck } from '@apps/games-zombofighter-client-uikit'

import * as selectors from '../../data/selectors'
import { Wrapper } from '../../ui/Player'

export const PlayerContainer: FC = () => {
    const player = useSelector(selectors.getPlayer)

    return player && (
        <Wrapper>
            <Duck
                skin={player.skin}
                status="normal"
            />
        </Wrapper>
    )
}
