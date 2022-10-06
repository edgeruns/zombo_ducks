import { Game, GameSnapshot, PlayerSnapshot, StatusGame } from './game'
import { randomUUID } from 'crypto'
import { Protection } from './protection'
import { Damage } from './damage'

describe('Game', () => {
    const fighter: PlayerSnapshot = {
        id: randomUUID(),
        wins: 10,
        loses: 1,
        nickname: 'devdammit',
        avatar: '',
    }

    const enemy: PlayerSnapshot = {
        id: randomUUID(),
        wins: 10,
        loses: 1,
        nickname: 'archi',
        avatar: '',
    }

    let snapshot: GameSnapshot = {
        id: randomUUID().toString(),
        players: {
            [fighter.id]: fighter,
            [enemy.id]: enemy,
        },
        rounds: [],
    }

    beforeEach(() => {
        snapshot = {
            id: randomUUID().toString(),
            players: {
                [fighter.id]: fighter,
                [enemy.id]: enemy,
            },
            rounds: [],
        }
    })

    it('Should be initialized as STARTED status', () => {
        const game = Game.setup(snapshot, fighter.id)

        expect(game.status).toEqual(StatusGame.STARTED)
    })

    it('Should be initialized as WAITING_PLAYERS', () => {
        const actions = Game.actionsToSnap(
            new Damage(true, false, false),
            new Protection(false, true, true)
        )

        snapshot.rounds.push({
            [enemy.id]: actions,
        })

        const game = Game.setup(snapshot, fighter.id)

        expect(game.status).toEqual(StatusGame.WAITING_PLAYERS)
    })

    it('Should be initialized as WAITING_PLAYERS and empty round when no one choices', () => {
        const actions = Game.actionsToSnap(
            new Damage(true, false, false),
            new Protection(false, true, true)
        )

        snapshot.rounds.push({
            [fighter.id]: actions,
            [enemy.id]: actions,
        })

        const game = Game.setup(snapshot, fighter.id)

        expect(game.status).toEqual(StatusGame.WAITING_PLAYERS)
        expect(game.rounds[game.rounds.length - 1].isAllReady()).toBeFalsy()
    })

    it('Should be return snapshot game', () => {
        const actions = Game.actionsToSnap(
            new Damage(true, false, false),
            new Protection(false, true, true)
        )

        snapshot.rounds.push({
            [fighter.id]: actions,
            [enemy.id]: actions,
        })

        const game = Game.setup(snapshot, fighter.id)
        const newSnapshot = game.getSnapshot()

        expect(newSnapshot.id).toEqual(snapshot.id)
        expect(newSnapshot.players[fighter.id].nickname).toEqual(
            fighter.nickname
        )
        expect(newSnapshot.rounds[0][fighter.id]).toEqual(actions)
    })
})
