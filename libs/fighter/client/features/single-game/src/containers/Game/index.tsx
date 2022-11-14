import { FC } from 'react'

import { EnemyContainer } from '../Enemy'
import { HudContainer } from '../Hud'
import { PlayerContainer } from '../Player'

export const SingleGameContainer: FC = () => {
    return (
        <>
            <PlayerContainer />
            <EnemyContainer />
            <HudContainer />
        </>
    )
}
