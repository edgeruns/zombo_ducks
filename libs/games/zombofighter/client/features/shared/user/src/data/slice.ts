import { createSlice } from '@reduxjs/toolkit'

import { Skins } from '../types'
import { State } from './types'

const initialState: State = {
    user: {
        id: 1,
        nickname: 'Devdammit',
        skin: Skins.Default,
        statistics: {
            allGames: 20,
            wonGames: 20
        }
    }
}

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})
