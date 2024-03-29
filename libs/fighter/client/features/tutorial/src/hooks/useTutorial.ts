import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const useTutorial = () => {
    const dispatch = useDispatch<any>()

    const fakeStartSearch = useCallback(() => {
        // dispatch(actions.startSearch())
    }, [dispatch])

    return {
        fakeStartSearch,
    }
}
