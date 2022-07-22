import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Actions,
    AppDispatch,
    BodyParts,
    GameResultType,
    ReceiveAction,
    UserSkins,
    slice,
    actions,
    selectors
} from '@apps/bar/data'

export const useTutorial = () => {
    const dispatch: AppDispatch = useDispatch()

    const fakeStartSearch = useCallback(() => {
        dispatch(slice.actions.startTutorialSearch())

        setTimeout(() => {
            dispatch(slice.actions.startTutorialGame())
        }, 5000)
    }, [dispatch])

    return {
        fakeStartSearch
    }
}
