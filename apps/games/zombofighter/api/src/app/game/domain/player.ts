export type PlayerParams = {
    wins: number
    loses: number
    id: string
    avatar: string
    nickname: string
}

export class Player {
    public readonly id: string
    public readonly nickname: string
    public readonly avatar: string
    private wins: number
    private loses: number

    constructor(params: PlayerParams) {
        this.wins = params.wins
        this.loses = params.loses
        this.id = params.id
        this.avatar = params.avatar
        this.nickname = params.nickname
    }

    public increaseWin() {
        this.wins += 1
    }

    public increaseLoses() {
        this.loses += 1
    }

    public getRating() {
        return {
            wins: this.wins,
            loses: this.loses,
        }
    }
}
