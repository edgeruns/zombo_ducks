import { useFeatDispatch } from '../data/store.feature'
import { FC, useCallback } from "react";
import { auth, AuthType } from '../data/actions'
import { Button } from '@apps/games-zombofighter-client-uikit'



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
