import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import * as selectors from '../data/selectors'

export function useFound() {
    const gameId = useSelector(selectors.getGameId)

    const navigate = useNavigate()

    useEffect(() => {
        if (gameId) {
            navigate(`/game/${gameId}`)
        }
    }, [gameId, navigate])
}
