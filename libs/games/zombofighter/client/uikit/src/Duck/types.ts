export enum Skins {
    Default = 'default',
}

export enum Status {
    Normal = 'normal',
    Lose = 'lose',
    Victory = 'victory',
}

export type Props = {
    skin?: Skins
    status?: Status
    className?: string
}
