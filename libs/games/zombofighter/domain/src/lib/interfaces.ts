export type BodyParts = [number, number, number]


export type PlayerState = {
    uuid: string
}

export type ActionState = {
    damage: BodyParts
    protection: BodyParts
}

export type RoundState = Record<PlayerState['uuid'], {
    defence: BodyParts
    attack: BodyParts
}>

export type GameMeta = {
    MAX_ROUNDS: number
    NEXT_ROUND_LATENCY: string
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

