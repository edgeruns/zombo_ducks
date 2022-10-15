import { FC } from 'react'

import { PlayerContainer } from '../Player'
import { EnemyContainer } from '../Enemy'
import { HudContainer } from '../Hud'

export const SingleGameContainer: FC = () => {
    return (
        <>
            <PlayerContainer />
            <EnemyContainer />
            <HudContainer />
        </>
    )
}
