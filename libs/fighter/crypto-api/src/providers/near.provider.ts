import BN from 'bn.js'
import * as near from 'near-api-js'
import { providers } from 'near-api-js'

import { Game, ICryptoApi, Player, ProviderName } from '../crypto-api.interface'

export class NearWeb3Provider implements ICryptoApi {
    public readonly name: ProviderName = ProviderName.NEAR

    private readonly config: near.ConnectConfig
    private readonly contractId: string

    constructor(config: near.ConnectConfig, contractId: string) {
        this.config = config
        this.contractId = contractId
    }

    public async acceptResult(
        gameId: Game['id'],
        playerId: Player['id'],
        winner?: Player['id']
    ): Promise<void> {
        const wallet = await this.getWallet()

        await wallet.account().functionCall({
            contractId: this.contractId,
            methodName: 'accept_result',
            args: {
                game_id: gameId,
                player_id: playerId,
                winner_id: winner,
            },
        })
    }

    public async deposit(amount: BN): Promise<void> {
        const wallet = await this.getWallet()

        await wallet.account().functionCall({
            contractId: this.contractId,
            methodName: 'deposit',
            args: {},
            attachedDeposit: amount,
        })
    }

    public async startGame(
        player1: Player['id'],
        player2: Player['id'],
        id: Game['id']
    ): Promise<Game['id']> {
        const wallet = await this.getWallet()

        return wallet
            .account()
            .functionCall({
                contractId: this.contractId,
                methodName: 'start_game',
                args: {
                    player1,
                    player2,
                    id,
                },
            })
            .then(providers.getTransactionLastResult)
    }

    public async getGame(id: Game['id']): Promise<Game> {
        const wallet = await this.getWallet()

        return wallet
            .account()
            .functionCall({
                contractId: this.contractId,
                methodName: 'get_game',
                args: {
                    id,
                },
            })
            .then(providers.getTransactionLastResult)
    }

    public async getPlayer(id: Player['id']): Promise<Player> {
        const wallet = await this.getWallet()
        return wallet
            .account()
            .functionCall({
                contractId: this.contractId,
                methodName: 'get_player',
                args: {
                    id,
                },
            })
            .then(providers.getTransactionLastResult)
    }

    public async getCurrentPlayer(): Promise<Player> {
        const wallet = await this.getWallet()

        return this.getPlayer(wallet.getAccountId())
    }

    public async register(): Promise<void> {
        const wallet = await this.getWallet()

        await wallet.account().functionCall({
            contractId: this.contractId,
            methodName: 'register',
            args: {},
        })
    }

    public async withdrawal(amount: BN): Promise<void> {
        const wallet = await this.getWallet()

        await wallet.account().functionCall({
            contractId: this.contractId,
            methodName: 'withdrawal',
            args: {
                amount: amount,
            },
        })
    }

    private async getWallet() {
        const connection = await near.connect(this.config)

        return new near.WalletConnection(connection, 'zombofighter')
    }
}
