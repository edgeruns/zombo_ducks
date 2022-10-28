import { ICryptoApi, IWeb3, ProviderName } from "./crypto-api.interface";




export class Web3 implements IWeb3 {
    private readonly providers: Map<ProviderName, ICryptoApi> = new Map()

    public addProvider(provider: ICryptoApi): Web3 {
        this.providers.set(provider.name, provider)

        return this
    }


    public getProvider(name: ProviderName): ICryptoApi {
        if (this.providers.has(name)) {
            return this.providers.get(name) as ICryptoApi
        }

        throw new Error('Provider not found')
    }
}
