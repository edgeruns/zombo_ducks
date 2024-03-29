import {
    instanceToPlain,
    plainToClassFromExist,
    Type,
} from 'class-transformer'
import * as fp from 'lodash/fp'
import ms from 'ms'

import { Action } from './action'
import { MAX_ROUNDS } from './constants'
import { GameMeta, GameState, PlayerState } from './interfaces'
import { Player } from './player'
import { Round } from './round'

export class Game {
    public uuid!: string

    @Type(() => Player)
    public players: Map<Player['uuid'], Player> = new Map()

    @Type(() => Round)
    public rounds: Round[] = []

    public static meta: GameMeta = {
        MAX_ROUNDS: MAX_ROUNDS,
        NEXT_ROUND_LATENCY: '5s',
        START_GAME_LATENCY: '2s',
        DEFAULT_ROUND_TIME: '10s',
    }

    public static init(state: GameState): Game {
        return plainToClassFromExist(new Game(), state)
    }

    public setAction(uuid: PlayerState['uuid'], action: Action) {
        fp.pipe(fp.last, (round: Round) => round.setAction(uuid, action))(
            this.rounds
        )
    }

    public async waitStartPlayers() {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(undefined)
            }, ms(Game.meta.START_GAME_LATENCY))
        })
    }

    public async waitNextRound() {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(undefined)
            }, ms(Game.meta.NEXT_ROUND_LATENCY))
        })
    }

    public startRound() {
        if (this.isFinished()) {
            throw new Error('game finished')
        }

        if (this.isWaiting()) {
            throw new Error('prev round is not finished')
        }

        this.rounds.push(new Round())
    }

    public isWaiting(): boolean {
        if (this.rounds.length === 0) {
            return false
        }

        return fp.pipe(
            fp.last,
            (round: Round) => !round.isAllReady()
        )(this.rounds)
    }

    public isFinished(): boolean {
        if (this.rounds.length === 0) {
            return false
        }

        if (this.isWaiting()) return false

        const everyoneIsAlive = fp.pipe(
            Object.fromEntries,
            Object.keys,
            fp.map((uuid: PlayerState['uuid']) => this.getHealth(uuid)),
            fp.filter<number>((health) => health > 0),
            (alivePlayers) => alivePlayers.length === 2
        )(this.players.entries())

        return (
            !this.isWaiting() &&
            !everyoneIsAlive &&
            this.rounds.length === Game.meta.MAX_ROUNDS
        )
    }

    public getWinner(): PlayerState['uuid'] | undefined {
        if (!this.isFinished()) {
            throw new Error('game not finished')
        }

        return fp.pipe(
            this.players.entries,
            Object.fromEntries,
            Object.keys,
            fp.map<
                PlayerState['uuid'],
                { uuid: PlayerState['uuid']; health: number }
            >((uuid) => ({
                uuid,
                health: this.getHealth(uuid),
            })),
            fp.filter<{ uuid: PlayerState['uuid']; health: number }>(
                ({ health }) => health > 0
            ),
            (uuids): PlayerState['uuid'] | undefined => {
                if (uuids.length === 0) {
                    return
                }

                return uuids[0].uuid
            }
        )()
    }

    public isDraw(): boolean {
        if (!this.isFinished()) {
            throw new Error('game not finished')
        }

        return fp.pipe(
            this.players.entries,
            Object.fromEntries,
            Object.keys,
            fp.map<
                PlayerState['uuid'],
                { uuid: PlayerState['uuid']; health: number }
            >((uuid) => ({
                uuid,
                health: this.getHealth(uuid),
            })),
            fp.filter<{ uuid: PlayerState['uuid']; health: number }>(
                ({ health }) => health > 0
            ),
            (uuids): boolean => {
                return uuids.length === 0
            }
        )()
    }

    public getState(): GameState {
        return instanceToPlain(this) as GameState
    }

    public getHealth(uuid: PlayerState['uuid']) {
        return fp.pipe(
            fp.map(
                fp.pipe(
                    (round: Round) => round.compute(Game.meta),
                    fp.find((result) => result.uuid === uuid),
                    fp.getOr(0, 'damage')
                )
            ),
            fp.reduce((health: number, damage: number) => health - damage, 100)
        )(this.rounds)
    }
}
