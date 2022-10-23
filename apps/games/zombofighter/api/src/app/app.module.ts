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

@Module({
    controllers: [AppController],
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forRoot({ load: [configuration] })],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.name'),
                entities: [UserSchema, SessionSchema, PlayerSchema],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}
