import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import game from '@apps/games-zombofighter-client-data'

export const useTutorial = () => {
    const dispatch = useDispatch<any>()

    const fakeStartSearch = useCallback(() => {
        dispatch(game.slice.actions.startTutorialSearch())

        setTimeout(() => {
            dispatch(game.slice.actions.startTutorialGame())
        }, 5000)
    }, [dispatch])

    return {
        fakeStartSearch
    }
}
