import { BodyParts } from '@apps/games-zombofighter-client-data'

export type Props = {
    isVisible: boolean
    isIconVisible: boolean
    selectedParts: BodyParts[]
    defendedParts: BodyParts[]
    damagedParts: BodyParts[]
    disabledParts: BodyParts[]
    darkedParts: BodyParts[]
    onBodyPartClick: (part: BodyParts) => void
}
