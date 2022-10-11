import { User } from '@apps/games-zombofighter-client-data'

export type Props = {
    isVisible: boolean
    isVictory: boolean
    isLose: boolean
    player: User
    profit: number
    onAgainClick: () => void
    onCrossClick: () => void
}
