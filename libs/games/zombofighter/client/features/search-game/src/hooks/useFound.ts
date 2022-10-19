import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../data/actions'
import * as selectors from '../data/selectors'

export function useFound() {
    const dispatch = useDispatch()

    const gameId = useSelector(selectors.getGameId)

    const navigate = useNavigate()

    useEffect(() => {
        if (gameId) {
            navigate(`/game/${gameId}`)
        }
    }, [gameId, navigate])

    useEffect(() => {
        return () => {
            dispatch(actions.reset())
        }
    }, [dispatch])
}
