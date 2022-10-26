import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from './config/configuration'

import {
    PlayerSchema,
    SessionSchema,
    UserSchema,
} from '@apps/games/zombofighter/api/schemas'
import { AppConfig } from '@apps/games/zombofighter/api/config'
import { AuthModule } from '@apps/games/zombofighter/api/auth'

@Module({
    controllers: [AppController],
    imports: [
        AuthModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forRoot({ load: [configuration] })],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get<AppConfig['database']['url']>(
                    'database.url'
                ),
                entities: [UserSchema, SessionSchema, PlayerSchema],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
