export enum Skins {
    Default = 'default'
}

export type Statistics = {
    wins: number
    loses: number
}

export type User = {
    id: string
    nickname: string
    skin: Skins
    avatar: string
    statistics: Statistics
}
