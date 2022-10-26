import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SessionSchema, UserSchema } from '@apps/games/zombofighter/api/schemas'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { AppCacheModule } from '@apps/games/zombofighter/api/cache'
import { JwtModule } from '@nestjs/jwt'
import { AppConfig } from '@apps/games/zombofighter/api/config'
import { NearController } from './near/near.controller'
import { AuthController } from './auth.controller'
import { AuthService } from "./auth.service";
import { NearStrategy } from "./near/near.strategy";
import { JwtStrategy } from "./jwt/jwt.strategy";

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
    providers: [
        AuthService,
        NearStrategy,
        JwtStrategy,
    ]
})
export class AuthModule {}
