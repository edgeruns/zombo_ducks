import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { playSound, Sounds } from '@apps/games/zombofighter/client/features/shared/sounds'

import { StartButton } from '../../ui'

export const StartGameContainer: FC = () => {
    const navigate = useNavigate()

    const handleButtonClick = useCallback(() => {
        playSound(Sounds.Button)
        navigate('/game/search')
    }, [navigate])

    return (
        <StartButton onClick={handleButtonClick}>
            START
        </StartButton>
    )
}
