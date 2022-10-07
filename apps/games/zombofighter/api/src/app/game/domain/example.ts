type State = {
    id: string
}

class Game {
    public id: string

    constructor(id: string) {
        this.id = id
    }

    attack() {
        console.log('asds')
    }


    public getState(): State {
        return {
            id: this.id
        }
    }

    public static initial(state: State) {
        return new Game(state.id)
    }
}


const state = {
    game: {
        id: '1'
    }
}

const game = Game.initial(state.game)

game.attack()

state.game = game.getState()




