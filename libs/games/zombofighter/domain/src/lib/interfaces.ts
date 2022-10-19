export type BodyParts = [number, number, number]

export type PlayerState = {
    uuid: string

    statistic: {
        wins: number
        loses: number
        draws: number
    }
}

export type ActionState = {
    damage: BodyParts
    protection: BodyParts
}

export type RoundState = Record<PlayerState['uuid'], ActionState>

export type GameMeta = {
    MAX_ROUNDS: number
    NEXT_ROUND_LATENCY: string
    START_GAME_LATENCY: string
    DEFAULT_ROUND_TIME: string
}

export type RoundResult = {
    uuid: PlayerState['uuid']
    damage: number
}

export type GameState = {
    uuid: string
    players: Record<PlayerState['uuid'], PlayerState>
    rounds: RoundState[]

    meta: GameMeta
}

