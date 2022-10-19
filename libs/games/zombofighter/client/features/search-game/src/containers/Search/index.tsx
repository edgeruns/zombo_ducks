import { FC } from 'react'

import { useLoader, usePlayer, useStart, useFound } from '../../hooks'
import { Loader, Player } from '../../ui'

export const SearchGameContainer: FC = () => {
    const loader = useLoader()
    const player = usePlayer()

    useStart()
    useFound()

    return (
        <>
            <Loader {...loader} />

            {player && (
                <Player {...player} />
            )}
        </>
    )
}
