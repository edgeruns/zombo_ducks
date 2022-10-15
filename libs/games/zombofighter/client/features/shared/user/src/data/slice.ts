import { createSlice } from '@reduxjs/toolkit'

import { Skins } from '../types'
import { State } from './types'

const initialState: State = {
    user: {
        id: '1',
        nickname: 'devdammit',
        skin: Skins.Default,
        avatar: '/assets/avatar.png',
        statistics: {
            wins: 20,
            loses: 10
        }
    }
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})
