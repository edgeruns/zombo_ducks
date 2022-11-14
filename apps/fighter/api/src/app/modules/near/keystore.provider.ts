import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { KeyPair,keyStores } from 'near-api-js'

import { KEY_STORE_PROVIDER } from './constants'

export const keystoreProvider: Provider = {
    provide: KEY_STORE_PROVIDER,
    useFactory: async () => {
        const keyStore = new keyStores.InMemoryKeyStore()
        const keyPair = KeyPair.fromString(process.env.PRIVATE_NEAR_WALLET_KEY)

        await keyStore.setKey('testnet', process.env.NEAR_WALLET_ID, keyPair)

        return keyStore
    },
    inject: [ConfigService],
}
