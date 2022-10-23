import { CacheModule, Module } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppConfig } from '@apps/games/zombofighter/api/config'

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            isGlobal: true,
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get<AppConfig['cache']['host']>(
                    'cache.host'
                ),
                password: configService.get<AppConfig['cache']['port']>(
                    'cache.port'
                ),
                port: configService.get<AppConfig['cache']['port']>(
                    'cache.port'
                ),
                username: configService.get<AppConfig['cache']['username']>(
                    'cache.username'
                ),
                db: configService.get<AppConfig['cache']['db']>('cache.db'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppCacheModule {}
