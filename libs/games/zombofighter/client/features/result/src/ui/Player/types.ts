import { UserSkins } from '@apps/games/zombofighter/client/features/shared/user'

type PlayerStatus = 'normal' | 'victory' | 'lose'

export type Props = {
    skin: UserSkins
    status: PlayerStatus
}
