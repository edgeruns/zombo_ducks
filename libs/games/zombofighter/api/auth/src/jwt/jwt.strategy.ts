import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Injectable } from '@nestjs/common'
import { JwtPayload } from '../auth.interfaces'
import { PlayerSchema, UserRole } from "@apps/games/zombofighter/api/schemas";

export type JwtUser = {
    id: string
    playerId: PlayerSchema['id']
    roles: UserRole[]
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env['JWT_SECRET'],
        })
    }

    validate(payload: JwtPayload): JwtUser {
        return {
            id: payload.id,
            playerId: payload.playerId,
            roles: payload.roles,
        }
    }
}
