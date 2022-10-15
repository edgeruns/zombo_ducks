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
    uuid: string

    @PrimaryColumn()
    wallet: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    getNickname() {
        return this.wallet.split('.')[0]
    }
}
