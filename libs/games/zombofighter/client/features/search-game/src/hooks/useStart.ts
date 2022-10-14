import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import * as actions from '../data/actions'

export function useStart() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(actions.start())
    }, [dispatch])
}
