import BN from 'bn.js'

export enum ProviderName {
    NEAR = 'near',
}

export interface PlayerStatistic {
    wins: number
    loses: number
    draws: number
}

export interface Player {
    id: string
    statistic: PlayerStatistic
    deposit: BN
}

export interface Statement {
    owner: Player['id']
    winner?: Player['id']
}

export interface Game {
    id: string
    players: Map<Player['id'], Player>
    statements: Map<Statement['owner'], Statement>
    isFinished: boolean
    createdAt: Date
}

export interface ICryptoApi {
    name: ProviderName

    register(): Promise<void>

    deposit(amount: BN): Promise<void>

    getPlayer(id: Player['id']): Promise<Player>

    getCurrentPlayer(): Promise<Player>

    withdrawal(amount: BN): Promise<void>

    getGame(id: Game['id']): Promise<Game>

    acceptResult(
        gameId: Game['id'],
        playerId: Player['id'],
        winner?: Player['id']
    ): Promise<void>
}

export interface IWeb3 {
    getProvider(name: ProviderName): ICryptoApi

    addProvider(provider: ICryptoApi): IWeb3
}
