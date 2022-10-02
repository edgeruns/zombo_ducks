import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { PlayerSchema } from '../schemas/player.schema'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PlayersService {
    constructor(
        @InjectRepository(PlayerSchema)
        private repository: Repository<PlayerSchema>
    ) {}

    async find(wallet: string) {
        return await this.repository
            .findOne({ where: { wallet }, relations: [ 'winGames', 'losesGames' ] })
            .then((res) => {
                if (res) return res

                const entity = new PlayerSchema()
                entity.wallet = wallet

                return this.repository.save(entity)
            })
    }
}
