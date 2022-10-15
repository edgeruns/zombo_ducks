import { FC } from 'react'
import { useSelector } from 'react-redux'

import { Duck } from '@apps/games-zombofighter-client-uikit'

import * as selectors from '../../data/selectors'
import { Wrapper } from '../../ui/Enemy'

export const EnemyContainer: FC = () => {
    const enemy = useSelector(selectors.getEnemy)
    const isGameStart = useSelector(selectors.isGameStart)

    return enemy && (
        <Wrapper arrive={isGameStart}>
            <Duck
                skin={enemy.skin}
                status="normal"
            />
        </Wrapper>
    )
}
