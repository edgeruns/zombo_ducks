import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { JwtPayload, LoginPayload, RefreshJwtPayload } from './auth.interfaces'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { SessionSchema } from '../../schemas/src/lib/Session.schema'
import { JwtService } from '@nestjs/jwt'
import { AppConfig } from '@apps/games/zombofighter/api/config'

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)

    constructor(
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService,
        @InjectRepository(SessionSchema)
        private readonly _sessionsRepository: Repository<SessionSchema>
    ) {}

    async login(data: LoginPayload) {
        const session = await this._sessionsRepository.save(
            this._sessionsRepository.create({
                user: data.user,
                active: true,
            })
        )

        const accessJwtPayload: JwtPayload = {
            id: data.user.id,
            playerId: data.user.playerId,
            roles: data.user.roles,
        }

        const refreshJwtPayload: RefreshJwtPayload = {
            ...accessJwtPayload,
            sessionId: session.id,
        }

        const accessToken = this._jwtService.sign(accessJwtPayload)
        const refreshToken = this._jwtService.sign(refreshJwtPayload, {
            expiresIn: this._configService.get<
                AppConfig['auth']['refreshExpireTime']
            >('auth.refreshExpireTime'),
        })

        return {
            accessToken,
            refreshToken,
        }
    }

    async refresh(token: string) {
        const payload = this._jwtService.decode(token) as RefreshJwtPayload
        const session = await this._sessionsRepository.findOne({
            where: { id: payload.sessionId },
            relations: {
                user: true,
            },
        })

        if (!session) {
            throw new UnauthorizedException()
        }

        session.active = false

        await this._sessionsRepository.save(session)

        return this.login({
            user: session.user,
        })
    }
}
