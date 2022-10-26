import { createAsyncThunk } from '@reduxjs/toolkit'
import { NearAuthService } from './service'

export const auth = createAsyncThunk('auth/near/connect', async () => {
    const service = new NearAuthService()
    const wallet = await service.getWallet()

    if (!wallet.isSignedIn()) {
        await wallet.requestSignIn({
            contractId: 'dev-1666552889577-38323691712830',
            methodNames: [
                'register',
                'get_player',
                'start_game',
                'get_game',
                'accept_result',
            ],
        })
    }
})

export const check = createAsyncThunk<boolean>('auth/near/check', async () => {
    const service = new NearAuthService()
    const wallet = await service.getWallet()


    return await wallet.isSignedInAsync()
})
