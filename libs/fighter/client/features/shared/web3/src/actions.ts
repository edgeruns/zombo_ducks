import { Player, ProviderName } from '@apps/fighter/crypto-api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import BN from 'bn.js'

import { web3 } from './connection'

export const getPlayerById = createAsyncThunk<Player, Player['id']>(
    'web3/player/getById',
    async (id: Player['id']) => {
        return web3.getProvider(ProviderName.NEAR).getPlayer(id)
    }
)

export const getCurrentPlayer = createAsyncThunk<Player>(
    'web3/player/getById',
    async () => {
        return web3.getProvider(ProviderName.NEAR).getCurrentPlayer()
    }
)

export const deposit = createAsyncThunk<void, BN>(
    'web3/player/deposit',
    async (amount: BN) => {
        return web3.getProvider(ProviderName.NEAR).deposit(amount)
    }
)
