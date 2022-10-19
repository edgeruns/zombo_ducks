import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

import { GetResultArgs, GetResultPayload } from './types'

export const reset = createAction('result/reset')

export const get = createAsyncThunk<
    GetResultPayload,
    GetResultArgs
>(
    'result/get',
    async () => {
        return {
            profit: 10
        }
    }
)
