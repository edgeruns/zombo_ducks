import { Round } from './round'
import { Player } from './player'
import { MAX_ROUNDS } from './constants'
import * as fp from 'lodash/fp'
import { Fighter } from './fighter'
import { Damage } from './damage'
import { Protection } from './protection'

type FighterState = {
    uuid: string
    nickname: string
    avatar: string
    wins: number
    loses: number
    steps: Uint8Array[]
}

type RedisRoomState = {
    uuid: string
    fighters: Record<FighterState['uuid'], FighterState>
    createdAt: Date
}


interface RoomInterface {
    fromStoreValue(state: RedisRoomState, playerUuid: FighterState['uuid']): RoomInterface
    toStoreValue(playerUuid: FighterState['uuid']): RedisRoomState
}

export class Room {
    private uuid: string

    private fighter: Fighter
    private enemy: Fighter

    private rounds: Round[]

    private readonly maxRounds = MAX_ROUNDS

    fromStoreValue(state: RedisRoomState, playerUuid: string) {
        const viewOf = state.fighters[playerUuid]
        const enemyUuid = fp.pipe(
            fp.toPairs,
            fp.filter(([uuid]) => uuid !== playerUuid),
            fp.map(([uuid]) => uuid),
            fp.first
        )(state.fighters)
        const enemyState = state.fighters[enemyUuid]

        this.uuid = state.uuid
        this.fighter = new Fighter(
            new Player({
                id: viewOf.uuid,
                wins: viewOf.wins,
                loses: viewOf.loses,
                avatar: viewOf.avatar,
                nickname: viewOf.nickname,
            })
        )
        this.enemy = new Fighter(
            new Player({
                id: enemyState.uuid,
                wins: enemyState.wins,
                loses: enemyState.loses,
                avatar: enemyState.avatar,
                nickname: enemyState.nickname,
            })
        )

        viewOf.steps.forEach((step) => {
            const round = new Round()
            const damage = Damage.fromBytes(step.slice(0, 3))
            const protection = Protection.fromBytes(step.slice(3, 6))

            round.setFighters(this.fighter, this.enemy)
            round.setReady(damage, protection)

            this.rounds.push(round)
        })

        for (let index = 0; index < enemyState.steps.length; index++) {
            if (!this.rounds[index]) {
                break
            }
            const step = enemyState.steps[index]
            const round = this.rounds[index]
            const damage = Damage.fromBytes(step.slice(0, 3))
            const protection = Protection.fromBytes(step.slice(3, 6))

            round.setReadyEnemy(damage, protection)

            this.rounds[index] = round
        }

        this.rounds.map((round) => {
            return round.compute(this.maxRounds)
        })

        return this
    }


    private getFighterState(fighter: Fighter) {
        const rating = fighter.player.getRating()

        return {
            uuid: fighter.player.id,
            wins: rating.wins,
            loses: rating.loses,
            nickname: fighter.player.nickname,
            avatar: fighter.player.avatar,
            steps: []
        }
    }
}
