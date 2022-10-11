import { instanceToPlain, plainToInstance, Type } from 'class-transformer'
import * as fp from 'lodash/fp'
import ms from 'ms'
import { Player } from './player'
import { Round } from './round'
import { GameMeta, GameState, PlayerState } from './interfaces'
import { MAX_ROUNDS } from './constants'
import { Action } from './action'


export class Game {
    public uuid!: string

    @Type(() => Player)
    public players: Map<Player['uuid'], Player> = new Map()

    @Type(() => Round)
    public rounds: Round[] = [new Round()]

    public static meta: GameMeta = {
        MAX_ROUNDS: MAX_ROUNDS,
        NEXT_ROUND_LATENCY: '5s',
    }

    public static init(state: GameState): Game {
        return plainToInstance(Game, state)
    }

    public setAction(uuid: PlayerState['uuid'], action: Action) {
        fp.pipe(fp.last, (round: Round) =>
            round.setAction(uuid, action)
        )(this.rounds)
    }

    public nextRound() {
        if (this.isFinished()) {
            throw new Error('game finished')
        }

        if (this.isWaiting()) {
            throw new Error('prev round is not finished')
        }

        setTimeout(() => {
            this.rounds.push(new Round())
        }, ms(Game.meta.NEXT_ROUND_LATENCY))
    }

    public isWaiting(): boolean {
        return fp.pipe(
            fp.last,
            (round: Round) => !round.isAllReady()
        )(this.rounds)
    }

    public isFinished(): boolean {
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
                if (uuids.length === 1) {
                    return uuids[0].uuid
                }

                return
            }
        )()
    }

    public getState(): GameState {
        return instanceToPlain(this) as GameState
    }

    private getHealth(uuid: PlayerState['uuid']) {
        return fp.pipe(
            fp.map(
                fp.pipe(
                    (round: Round) => round.compute(Game.meta),
                    fp.find((result) => result.uuid === uuid),
                    fp.get('damage')
                )
            ),
            fp.reduce((health: number, damage: number) => health - damage, 100)
        )(this.rounds)
    }
}
