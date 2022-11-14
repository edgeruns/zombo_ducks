import { PlayerSchema, UserRole, UserSchema } from '@apps/fighter/api/schemas'
import { Request } from 'express'

export type AuthTokens = {
    accessToken: string
    refreshToken: string
}

export type JwtPayload = {
    id: UserSchema['id']
    playerId: PlayerSchema['id']
    roles: UserRole[]
}

export type RefreshJwtPayload = JwtPayload & {
    sessionId: string
}

export type LoginPayload = {
    user: UserSchema
}

export interface AuthenticatedReq extends Request {
    user: JwtPayload
}
