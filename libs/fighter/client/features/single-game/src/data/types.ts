import { GameState } from '@apps/fighter/domain'
import { EntityState } from '@reduxjs/toolkit'

export type Player = {
    id: string
    nickname: string
    avatar: string
}

export enum PlayerStatus {
    Normal = 'normal',
    Lose = 'lose',
    Victory = 'victory',
}

export type BodyParts = [number, number, number]

export type State = {
    game: GameState
    players: EntityState<Player>
    isActionSended: boolean
    selectedAttacks: BodyParts
    selectedDefences: BodyParts
    isQuitPopupVisible: boolean
}

export type InitPayload = {
    gameState: GameState
    players: Player[]
}

export type ActionPayload = {
    uuid: string
    damage: BodyParts
    protection: BodyParts
}

export type FinishRoundArgs = {
    enemyAction: {
        damage: BodyParts
        protection: BodyParts
    }
}

export type SelectAttackPayload = number
export type SelectDefencePayload = number
