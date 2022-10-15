type Player = {
    id: string
    nickname: string
    avatar: string
    health: number
    statistics: {
        wins: number
        loses: number
    }
}

export type Props = {
    isVisible: boolean
    isCanQuit: boolean
    player: Player | null
    opponent: Player | null
    onQuitClick: () => void
}
