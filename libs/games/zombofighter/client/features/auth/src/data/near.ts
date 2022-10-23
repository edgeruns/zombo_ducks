import * as near from 'near-api-js'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Buffer } from 'buffer'

window.Buffer = window.Buffer || Buffer
const keyStore = new near.keyStores.BrowserLocalStorageKeyStore(window.localStorage, 'zombofighter')

export const connectToNetwork = async () => {
    const config: near.ConnectConfig = {
        networkId: 'testnet',
        keyStore: keyStore,
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        headers: {},
    }

    return near.connect(config)
}

export const connectToWallet = async (connection: near.Near) => {
    return new near.WalletConnection(connection, 'zombofighter')
}

export const auth = createAsyncThunk('auth/near/connect', async () => {
    const network = await connectToNetwork()
    const wallet = await connectToWallet(network)

    if (!wallet.isSignedIn()) {
        await wallet.requestSignIn({  })
    }
})

export const check = createAsyncThunk<boolean>('auth/near/check', async () => {
    const network = await connectToNetwork()
    const wallet = await connectToWallet(network)

    return wallet.isSignedIn()
})
