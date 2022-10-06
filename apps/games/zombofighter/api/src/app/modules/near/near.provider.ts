import { Provider } from '@nestjs/common'
import { KEY_STORE_PROVIDER, NEAR_PROVIDER } from './constants'
import { connect, ConnectConfig } from 'near-api-js'
import { KeyStore } from 'near-api-js/lib/key_stores'

export const nearProvider: Provider = {
    provide: NEAR_PROVIDER,
    useFactory: async (keyStore: KeyStore) => {
        const config: ConnectConfig = {
            networkId: process.env.NEAR_NETWORK_ID,
            keyStore,
            nodeUrl: process.env.NEAR_NODE_URL,
            walletUrl: process.env.NEAR_WALLET_URL,
            helperUrl: process.env.NEAR_HELPER_URL,
            headers: {},
        }

        return connect(config)
    },
    inject: [KEY_STORE_PROVIDER],
}
