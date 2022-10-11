import { User } from '@apps/games-zombofighter-client-data'

type FullUser = User & {
    health: number
}

export type Props = {
    isVisible: boolean
    isCanQuit: boolean
    player: FullUser | null
    opponent: FullUser | null
    onQuitClick: () => void
}
