import { FC, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { playSound, Sounds } from '@apps/fighter/client/features/shared/sounds'
import { getBalance } from '@apps/fighter/client/features/shared/web3'

import { StartButton } from '../../ui'

export const StartGameContainer: FC = () => {
    const navigate = useNavigate()
    const balance = useSelector(getBalance)

    console.log(balance)

    const handleButtonClick = useCallback(() => {
        if (balance > 0) {
            playSound(Sounds.Button)
            navigate('/game/search')
        } else {
            navigate('/deposit')
        }
    }, [navigate, balance])

    return <StartButton onClick={handleButtonClick}>START</StartButton>
}
