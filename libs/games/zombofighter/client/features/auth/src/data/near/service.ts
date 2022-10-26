import * as near from 'near-api-js'
import axios from 'axios'
import { setTokens, Tokens } from "../storage";
import { Buffer } from 'buffer'


window.Buffer = window.Buffer || Buffer

const keyStore = new near.keyStores.BrowserLocalStorageKeyStore(
    window.localStorage,
    'zombofighter'
)

export class NearAuthService {
    private connection?: near.Near
    private wallet?: near.WalletConnection

    public async login() {
        const wallet = await this.getWallet()
        const timestamp = Date.now()
        const keyPair = await keyStore.getKey(
            wallet.account().connection.networkId,
            wallet.account().accountId
        )

        const { signature, publicKey } = keyPair.sign(Buffer.from(timestamp.toString()))

        const tokens = await axios
            .put<Tokens>('/api/auth/near', {
                publicKey: publicKey.toString(),
                signature: Buffer.from(signature).toString('base64'),
                timestamp,
                accountId: wallet.account().accountId,
            })
            .then((res) => res.data)

        setTokens(tokens)
    }

    public async register() {
        const wallet = await this.getWallet()
        const account = wallet.account()


        await account.functionCall({
            contractId: 'dev-1666552889577-38323691712830',
            methodName: 'register',
            args: {},
        })
    }

    public async getWallet() {
        if (!this.wallet) {
            await this.connect()
            await this.connectToWallet()
        }

        if (!this.wallet) {
            throw new Error('Not connected to wallet')
        }

        return this.wallet
    }

    private connectToWallet() {
        if (!this.connection) {
            throw new Error('Not connected to network')
        }

        this.wallet = new near.WalletConnection(this.connection, 'zombofighter')

        return this.wallet
    }

    private async connect() {
        this.connection = await near.connect({
            networkId: 'testnet',
            keyStore: keyStore,
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
            headers: {},
        })
    }
}
