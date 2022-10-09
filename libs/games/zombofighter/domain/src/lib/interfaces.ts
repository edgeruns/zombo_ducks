export type BodyParts = [number, number, number]


export type PlayerState = {
    uuid: string
}


export type RoundState = Record<PlayerState['uuid'], {
    defence: BodyParts
    attack: BodyParts
}>

export type GameState = {
    uuid: string
    players: Record<PlayerState['uuid'], PlayerState>
    rounds: RoundState[]

    createdAt: string
}

export abstract class AbstractGame {
    protected uuid: string | undefined

    abstract getState(): GameState
}



