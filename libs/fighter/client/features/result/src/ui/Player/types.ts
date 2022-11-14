import { UserSkins } from '@apps/fighter/client/features/shared/user'

type PlayerStatus = 'normal' | 'victory' | 'lose'

export type Props = {
    skin: UserSkins
    status: PlayerStatus
}
