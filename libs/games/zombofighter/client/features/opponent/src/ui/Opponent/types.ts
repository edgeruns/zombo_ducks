import { UserSkins, UserStatus } from '@apps/games-zombofighter-client-data'

export type Props = {
    isVisible: boolean
    isArrived: boolean
    skin?: UserSkins
    status: UserStatus
}
