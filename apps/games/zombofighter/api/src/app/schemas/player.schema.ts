import {
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm'
import { GameSchema } from './game.schema'

@Entity('players')
export class PlayerSchema {
    @PrimaryColumn()
    wallet: string

    @OneToMany(() => GameSchema, (game) => game.winner)
    winGames: GameSchema[]

    @OneToMany(() => GameSchema, (game) => game.loser)
    losesGames: GameSchema[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    getNickname() {
        return this.wallet.split('.')[0]
    }

    getCountWins() {
        return this.winGames.length
    }

    getCountLoses() {
        return this.losesGames.length
    }
}
