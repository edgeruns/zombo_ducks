import { AppConfig } from '@apps/fighter/api/config'
import { CacheModule, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as redisStore from 'cache-manager-redis-store'

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
