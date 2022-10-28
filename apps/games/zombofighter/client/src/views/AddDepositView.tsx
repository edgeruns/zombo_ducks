import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { deposit } from '@apps/games/zombofighter/client/features/shared/web3'
import { Button } from '@apps/games-zombofighter-client-uikit'
import { BN } from 'bn.js'

import { AppDispatch } from '../store'

export const AddDepositView = () => {
    const dispatch = useDispatch<AppDispatch>()
    const handleAddDeposit = useCallback(() => {
        dispatch(deposit(new BN(300000000000000)))
    }, [dispatch])

    return (
        <Button size="s" onClick={handleAddDeposit}>
            Add deposit
        </Button>
    )
}
