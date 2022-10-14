import { FC } from 'react'
import { useSelector } from 'react-redux'

import user from '@apps/games/zombofighter/client/features/shared/user'
import { Duck } from '@apps/games-zombofighter-client-uikit'

import { Wrapper } from '../../ui'

export const HomePlayerContainer: FC = () => {
    const player = useSelector(user.selectors.getUser)

    return (
        <Wrapper>
            <Duck skin={player.skin} />
        </Wrapper>
    )
}
