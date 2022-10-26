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
                url: configService.get<AppConfig['cache']['url']>('cache.url'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class AppCacheModule {}
