export enum BodyParts {
    Head = 'head',
    Torso = 'torso',
    Leg = 'leg',
}

export type Icons = 'shield' | 'hit'

export type Props = {
    img: string
    part: BodyParts
    icon?: Icons
    size?: 's' | 'm'
    selected?: boolean
    defended?: boolean
    damaged?: boolean
    disabled?: boolean
    darked?: boolean
    reversed?: boolean
    className?: string
    onClick?: () => void
}
