import { useCallback } from 'react'
import { Button } from '@apps/fighter/client/uikit'

import { auth, AuthType } from '../data/actions'
import { useFeatDispatch } from '../data/store.feature'

export const NearConnectContainer = () => {
    const dispatch = useFeatDispatch()

    const handleClick = useCallback(() => {
        dispatch(auth(AuthType.Near))
    }, [dispatch])

    return (
        <div onClick={handleClick}>
            <Button size="s">Connect Wallet</Button>
        </div>
    )
}
