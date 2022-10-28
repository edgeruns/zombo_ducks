import { NearWeb3Provider } from '@apps/games/zombofighter/crypto-api'
import * as near from 'near-api-js'

const keyStore = new near.keyStores.BrowserLocalStorageKeyStore(
    window.localStorage,
    'zombofighter'
)

export const getNearProvider = () => {
    return new NearWeb3Provider(
        {
            networkId: 'testnet',
            keyStore: keyStore,
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
        },
        'dev-1666552889577-38323691712830'
    )
}
