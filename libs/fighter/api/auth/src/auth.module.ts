import { AppCacheModule } from '@apps/fighter/api/cache'
import { AppConfig } from '@apps/fighter/api/config'
import { SessionSchema, UserSchema } from '@apps/fighter/api/schemas'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { JwtStrategy } from './jwt/jwt.strategy'
import { NearController } from './near/near.controller'
import { NearStrategy } from './near/near.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    controllers: [AuthController, NearController],
    imports: [
        PassportModule,
        ConfigModule,
        AppCacheModule,
        TypeOrmModule.forFeature([UserSchema, SessionSchema]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<AppConfig['auth']['secret']>(
                    'auth.secret'
                ),
                signOptions: {
                    expiresIn: configService.get<
                        AppConfig['auth']['accessExpireTime']
                    >('auth.accessExpireTime'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, NearStrategy, JwtStrategy],
})
export class AuthModule {}
