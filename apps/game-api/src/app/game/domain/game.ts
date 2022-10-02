import * as fp from 'lodash/fp'

import { Fighter } from './fighter'
import { Round } from './round'
import { Damage } from './damage'
import { Protection } from './protection'
import { MAX_ROUNDS } from './constants'
import { Player } from './player'
import { randomUUID } from 'crypto';

export type PlayerSnapshot = {
    id: string
    nickname: string
    avatar: string
    wins: number
    loses: number
}

export type RoundSnapshot = {
    [key: string]: number[]
}

export type GameSnapshot = {
    id: string
    players: Record<PlayerSnapshot['id'], PlayerSnapshot>
    rounds: RoundSnapshot[]
}

export enum StatusGame {
    STARTED = 'STARTED',
    WAITING_PLAYERS = 'WAITING_PLAYERS',
    WAITING_NEXT_ROUND = 'WAITING_NEXT_ROUND',
    NEXT_ROUND_STARTED = 'NEXT_ROUNDED_STARTED',
    FINISHED = 'FINISHED',
}

export interface GameInterface {
    readonly id: string

    fighter: Fighter
    enemy: Fighter
    rounds: Round[]
    status: StatusGame

    /**
     * When current player is ready
     * @param damage
     * @param protection
     */
    doAction(damage: Damage, protection: Protection)

    /**
     * Setup game after something actions
     */
    run(): StatusGame
}

export class Game implements GameInterface {
    public readonly id: string

    public fighter: Fighter
    public enemy: Fighter
    public rounds: Round[]
    public status: StatusGame = StatusGame.STARTED

    constructor(
        uuid: string,
        fighter: Fighter,
        enemy: Fighter,
        rounds: Round[]
    ) {
        this.id = uuid
        this.fighter = fighter
        this.enemy = enemy
        this.rounds = rounds

        if (!this.fighter.isLiving() || !this.enemy.isLiving()) {
            this.status = StatusGame.FINISHED
        }


        if (this.status !== StatusGame.FINISHED) {
            if (this.rounds.length) {
                const lastRound = rounds[rounds.length - 1]

                if (lastRound.isAllReady()) {
                    this.status = StatusGame.WAITING_NEXT_ROUND
                    this.createNextRound()
                } else {
                    this.status = StatusGame.WAITING_PLAYERS
                }
            } else {
                this.rounds.push(new Round(this.fighter, this.enemy))
            }
        }
    }

    public doAction(damage: Damage, protection: Protection) {
        if (this.status === 'FINISHED') {
            throw new Error("You can't do something when game is finished")
        }

        const round = this.getCurrentRound()

        if (!round.isAllReady()) {
            round.fighter.setDamage(damage)
            round.fighter.setProtection(protection)
        }
    }

    public run(): StatusGame {
        const round = this.getCurrentRound()

        if (round.isAllReady()) {
            round.compute(MAX_ROUNDS)

            if (!round.fighter.isLiving() || !round.enemy.isLiving()) {
                this.status = StatusGame.FINISHED
            } else {
                this.status = StatusGame.WAITING_NEXT_ROUND
            }
        } else {
            this.status = StatusGame.WAITING_PLAYERS
        }


        if (this.status === StatusGame.WAITING_NEXT_ROUND) {
            this.createNextRound()
        }

        this.fighter = round.fighter
        this.enemy = round.enemy

        return this.status
    }

    public getSnapshot(): GameSnapshot {
        return {
            id: this.id,
            players: {
                [this.fighter.player.id]: Game.createSnapshotByFighter(this.fighter),
                [this.enemy.player.id]: Game.createSnapshotByFighter(this.enemy),
            },
            rounds: this.createSnapshotByRounds()
        }
    }

    public nextRound() {
        this.status = StatusGame.WAITING_NEXT_ROUND
    }

    public static setup(snapshot: GameSnapshot, viewOf: string) {
        const fighter = fp.pipe(Game.createFighterBySnapshot)(
            snapshot.players[viewOf]
        )

        const enemy = fp.pipe(
            fp.toPairs,
            fp.find(([id]) => id !== viewOf),
            fp.last,
            Game.createFighterBySnapshot
        )(snapshot.players)

        const rounds = Game.createRoundsBySnapshot(
            fighter,
            enemy,
            snapshot.rounds
        )

        return new Game(snapshot.id, fighter, enemy, rounds)
    }

    public static actionsToSnap(damage: Damage, protection: Protection): number[] {
        const bytes = new Array(6)

        const damageBytes = damage.toBytes()
        const protectionBytes = protection.toBytes()

        bytes[0] = protectionBytes[0]
        bytes[1] = protectionBytes[1]
        bytes[2] = protectionBytes[2]

        bytes[3] = damageBytes[0]
        bytes[4] = damageBytes[1]
        bytes[5] = damageBytes[2]

        return bytes
    }

    public static create(player: Fighter, enemy: Fighter) {
        const uuid = randomUUID()

        return new Game(uuid, player, enemy, [])
    }

    private getCurrentRound() {
        return this.rounds[this.rounds.length - 1]
    }

    private createNextRound() {
        if (!this.fighter.isLiving() || !this.enemy.isLiving()) {
            throw new Error(
                "One of fighter is dead. You can't create next round."
            )
        }

        const fighter = new Fighter(this.fighter.player)
        const enemy = new Fighter(this.enemy.player)

        const round = new Round(fighter, enemy)

        console.log('push round', round.fighter.getActions(), round.enemy.getActions())

        this.rounds.push(round)

        this.status = StatusGame.NEXT_ROUND_STARTED
    }

    private static createFighterBySnapshot(snapshot: PlayerSnapshot): Fighter {
        const player = new Player({
            id: snapshot.id,
            nickname: snapshot.nickname,
            avatar: snapshot.avatar,
            wins: snapshot.wins,
            loses: snapshot.loses,
        })

        return new Fighter(player)
    }
    private static createSnapshotByFighter(fighter: Fighter): PlayerSnapshot {
        return {
            id: fighter.player.id,
            nickname: fighter.player.nickname,
            avatar: fighter.player.avatar,
            ...fighter.player.getRating()
        }
    }

    private static createRoundsBySnapshot(
        fighter: Fighter,
        enemy: Fighter,
        snapshots: RoundSnapshot[]
    ) {
        const rounds: Round[] = []

        snapshots.forEach((snapshot) => {
            const fighterActions = Game.getFighterActionBySnap(
                snapshot,
                fighter.player.id
            )
            const enemyActions = Game.getFighterActionBySnap(
                snapshot,
                enemy.player.id
            )

            if (fighterActions) {
                fighter.setProtection(fighterActions.protection)
                fighter.setDamage(fighterActions.damage)
            }

            if (enemyActions) {
                enemy.setProtection(enemyActions.protection)
                enemy.setDamage(enemyActions.damage)
            }

            const round = new Round(fighter, enemy)

            if (round.isAllReady()) {
                const computed = round.compute(MAX_ROUNDS)

                fighter.health.setValue(computed.health.fighter)
                enemy.health.setValue(computed.health.enemy)
            }

            rounds.push(round)
        })

        return rounds
    }


    private createSnapshotByRounds(): RoundSnapshot[] {
        console.log(this.rounds.length)
        return this.rounds.map(round => {
            const fighterActions = round.fighter.getActions()
            const enemyActions = round.enemy.getActions()


            const result: RoundSnapshot = {}

            if (fighterActions) {
                result[round.fighter.player.id] = Game.actionsToSnap(fighterActions.damage, fighterActions.protection)
            }

            if (enemyActions) {
                result[round.enemy.player.id] = Game.actionsToSnap(enemyActions.damage, enemyActions.protection)
            }


            return result
        })
    }

    private static getFighterActionBySnap(
        snapshot: RoundSnapshot,
        uuid: string
    ) {
        if (!snapshot[uuid]) return undefined

        const bytes = snapshot[uuid]


        return {
            protection: Protection.fromBytes(bytes.slice(0, 3)),
            damage: Damage.fromBytes(bytes.slice(3, 6)),
        }
    }

}

