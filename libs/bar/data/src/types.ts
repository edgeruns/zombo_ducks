import { store } from './store'

export type AppStore = typeof store
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = typeof store.dispatch

export enum Scene {
    Start = 'start',
    Searching = 'searching',
    GameStart = 'game-start',
    Round = 'round',
    RoundFinish = 'round-finish',
    GameFinish = 'game-finish'
}

export enum UserSkins {
    Default = 'default'
}

export enum UserStatus {
    Normal = 'normal',
    Lose = 'lose',
    Victory = 'victory'
}

export enum BodyParts {
    Head = 'head',
    Torso = 'torso',
    Leg = 'leg'
}

export type User = {
    id: number
    nickname: string
    avatar: string
    skin: UserSkins
    statistics: {
        allGames: number
        wonGames: number
    }
}

export enum GameResultType {
    Victory = 'victory',
    Lose = 'lose'
}

type GameResult = {
    type: GameResultType
    profit: number
}

export type Game = {
    id: number
    rounds: number
    opponent: User
    result: GameResult | null
}

export type Round = {
    time: number
    player: {
        health: number
        damage: number
        attacks: BodyParts[]
        defences: BodyParts[]
    }
    opponent: {
        health: number
        damage: number
        attacks: BodyParts[]
        defences: BodyParts[]
    }
}

export enum Actions {
    StartSearch = 'START-SEARCH',
    GameStart = 'GAME-START',
    Attack = 'ATTACK',
    RoundStart = 'ROUND-START',
    RoundFinish = 'ROUND-FINISH',
    GameFinish = 'GAME-FINISH',
    QuitGame = 'QUIT-GAME'
}

type StartSearchActionArgs = {
    type: Actions.StartSearch,
    data: {
        userId: User['id']
    }
}

type AttackActionArgs = {
    type: Actions.Attack,
    data: {
        userId: number
        gameId: number
        attacks: BodyParts[]
        defences: BodyParts[]
    }
}

type QuitGameActionArgs = {
    type: Actions.QuitGame,
    data: {
        gameId: number
        userId: number
    }
}

export type SendActionPayload = {
    success: boolean
}

export type SendAction =
    | StartSearchActionArgs
    | AttackActionArgs
    | QuitGameActionArgs

type GameStartActionPayload = {
    type: Actions.GameStart,
    data: {
        gameId: number
        rounds: number
        opponent: User
    }
}

type RoundStartActionPayload = {
    type: Actions.RoundStart,
    data: {
        time: number
        player: {
            health: number
        }
        opponent: {
            health: number
        }
    }
}

type RoundFinishActionPayload = {
    type: Actions.RoundFinish,
    data: {
        player: {
            health: number
            damage: number
        }
        opponent: {
            health: number
            damage: number
            attacks: BodyParts[]
            defences: BodyParts[]
        }
    }
}

type GameFinishActionPayload = {
    type: Actions.GameFinish,
    data: {
        type: GameResultType
        profit: number
        statistics: {
            allGames: number
            wonGames: number
        }
    }
}

export type ReceiveActionPayload =
    | GameStartActionPayload
    | RoundStartActionPayload
    | RoundFinishActionPayload
    | GameFinishActionPayload

export type ReceiveAction =
    | GameStartActionPayload
    | RoundStartActionPayload
    | RoundFinishActionPayload
    | GameFinishActionPayload

export type State = {
    scene: Scene
    player: User | null
    game: Game | null
    timeLeft: number
    attacked: boolean
    rounds: Round[],
    quitPopupOpened: boolean
}
