import { useEffect } from 'react'

import { checkAuth } from '../data/actions'
import { getStatus } from '../data/selectors'
import { useFeatDispatch, useFeatSelector } from '../data/store.feature'

interface AuthCheckResult {
    checking: boolean
    authorized: boolean
}

export const useAuthCheck = (): AuthCheckResult => {
    const dispatch = useFeatDispatch()
    const status = useFeatSelector(getStatus)

    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    return status
}
