import { FC } from 'react'
import { useSelector } from 'react-redux'
import user from '@apps/fighter/client/features/shared/user'
import { Duck } from '@apps/fighter/client/uikit'

import { Wrapper } from '../../ui'

export const HomePlayerContainer: FC = () => {
    const player = useSelector(user.selectors.getUser)

    return (
        player && (
            <Wrapper>
                <Duck skin={player.skin} />
            </Wrapper>
        )
    )
}
