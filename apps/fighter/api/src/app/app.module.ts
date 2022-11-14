import { AuthModule } from '@apps/fighter/api/auth'
import { AppConfig } from '@apps/fighter/api/config'
import {
    PlayerSchema,
    SessionSchema,
    UserSchema,
} from '@apps/fighter/api/schemas'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import configuration from './config/configuration'
import { AppController } from './app.controller'

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
