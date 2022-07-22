import { Round } from './round'
import { Player } from './player'
import { MAX_ROUNDS } from './constants'


type Fighter = {
    uuid: string
    nickname: string
    avatar: string
    steps: Uint8Array[]
}

type RedisRoom = {
    uuid: string
    players: Record<Fighter['uuid'], Fighter>
    timestamp: Date
}

const redisState = {
    uuid: 'uuid1',
    players: {
        'uuid1': {
            uuid: 'uuid1',
            nickname: 'devdammit',
            avatar: 'https://asdas',
            steps: [
                new Uint8Array(6),
                new Uint8Array(6),
                new Uint8Array(6),
                new Uint8Array(6),
            ]
        },
        'uuid2': {
            uuid: 'uuid2',
            nickname: 'archi',
            avatar: 'https://asdasd',
            steps: [
                new Uint8Array(6),
                new Uint8Array(6),
                new Uint8Array(6),
                new Uint8Array(6),
            ]
        }
    },
    timestamp: new Date()
}

export class Room {
    private rounds: Round[]
    private players: Player[]
    private readonly maxRounds = MAX_ROUNDS
}
