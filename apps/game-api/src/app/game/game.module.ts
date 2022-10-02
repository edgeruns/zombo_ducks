import { CacheModule, Module } from '@nestjs/common'
import { GameGateway } from './game.gateway'
import { GameService } from './game.service'
import { PlayersModule } from '../players/players.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameSchema } from '../schemas/game.schema'
import * as redisStore from 'cache-manager-redis-store'
import { CacheService } from './cache.service';

@Module({
    imports: [
        PlayersModule,
        TypeOrmModule.forFeature([GameSchema]),
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379,
            ttl: 0,
        }),
    ],
    providers: [GameGateway, GameService, CacheService],
})
export class GameModule {}
