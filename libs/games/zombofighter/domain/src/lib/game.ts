import { GameState } from './interfaces'
import * as fp from 'lodash/fp'

export class Game {

    getState(): GameState {
        return {
            uuid: '',
            players: {
                asd: { uuid: 'asd' },
            },
            rounds: [],

            createdAt: '',
        }
    }

    public static init(state: GameState): Game {
        const players = fp.pipe(
            fp.toPairs,
        )(state.players)

        return new Game()
    }

}

const game = Game.init({
    uuid: '',
    players: {
        asd: { uuid: 'asd' },
    },
    rounds: [],

    createdAt: '',
})
