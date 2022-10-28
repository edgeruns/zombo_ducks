import { createAsyncThunk } from '@reduxjs/toolkit'

import * as nearActions from './near/actions'
import { NearAuthService } from './near/service'
import { AuthService } from './service'
import { FeatureDispatch } from './store.feature'

export enum AuthType {
    Near,
}

export const auth = createAsyncThunk<
    void,
    AuthType,
    { dispatch: FeatureDispatch }
>('auth/system', async (type, { dispatch }) => {
    if (type === AuthType.Near) {
        await dispatch(nearActions.auth()).unwrap()
    }
})

export const checkAuth = createAsyncThunk<
    boolean,
    void,
    { dispatch: FeatureDispatch }
>('auth/check', async (_, { dispatch }) => {
    const nearWalletSigned = await dispatch(nearActions.check()).unwrap()

    if (nearWalletSigned) {
        const service = new AuthService()
        const nearService = new NearAuthService()

        if (await service.checkAuth()) {
            return true
        }

        await nearService.login()

        return true
    }

    return false
})
