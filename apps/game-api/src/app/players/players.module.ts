import { Module } from '@nestjs/common'
import { PlayersService } from './players.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlayerSchema } from '../schemas/player.schema'

@Module({
    imports: [TypeOrmModule.forFeature([PlayerSchema])],
    providers: [PlayersService],
    exports: [PlayersService],
})
export class PlayersModule {}
