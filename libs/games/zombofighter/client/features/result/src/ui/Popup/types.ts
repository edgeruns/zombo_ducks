type Player = {
    id: string
    nickname: string
    avatar: string
    statistics: {
        wins: number
        loses: number
    }
}

export type Props = {
    isVictory: boolean
    isDraws: boolean
    isLose: boolean
    player: Player
    profit: number
    onAgainClick: () => void
    onCrossClick: () => void
}
