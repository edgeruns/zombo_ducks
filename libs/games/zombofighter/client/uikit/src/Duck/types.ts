export type Skins = 'default'

export type Status = 'normal' | 'lose' | 'victory'

export type Props = {
    skin?: Skins
    status?: Status
    className?: string
}
