import { createAction } from '@reduxjs/toolkit'

import { FoundPayload } from './types'

export const start = createAction('searchGame/start')
export const found = createAction<FoundPayload>('searchGame/found')
export const reset = createAction('searchGame/reset')
