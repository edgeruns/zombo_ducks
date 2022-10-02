import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne, PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { GameSnapshot, StatusGame } from '../game/domain/game'
import { PlayerSchema } from './player.schema'

@Entity('games')
export class GameSchema {
    @PrimaryColumn()
    id: string

    @Column({ type: 'enum', enum: StatusGame, default: StatusGame.STARTED })
    status: StatusGame

    @Column({ type: 'simple-json' })
    snapshot: GameSnapshot

    @ManyToOne(() => PlayerSchema, (player) => player.winGames)
    winner?: PlayerSchema

    @ManyToOne(() => PlayerSchema, (player) => player.losesGames)
    loser?: PlayerSchema

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
