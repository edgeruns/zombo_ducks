export enum Skins {
    Default = 'default'
}

export type Statistics = {
    allGames: number
    wonGames: number
}

export type User = {
    id: number
    nickname: string
    skin: Skins
    statistics: Statistics
}
