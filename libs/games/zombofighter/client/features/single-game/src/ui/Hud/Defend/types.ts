type BodyParts = [number, number, number]

export type Props = {
    isVisible: boolean
    isIconVisible: boolean
    selectedParts: BodyParts
    defendedParts: BodyParts
    damagedParts: BodyParts
    disabledParts: BodyParts
    darkedParts: BodyParts
    onBodyPartClick: (index: number) => void
}
