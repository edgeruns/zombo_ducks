import {
    Column,
    Entity, JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { PlayerSchema } from './Player.schema'
import { SessionSchema } from './Session.schema'

export enum UserRole {
    PLAYER,
    ADMIN,
}

@Entity('users')
export class UserSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => PlayerSchema)
    @JoinColumn()
    player: PlayerSchema

    @OneToMany(() => SessionSchema, (session) => session.user)
    sessions: SessionSchema[]

    @Column({
        type: 'simple-enum',
        enum: UserRole,
        array: true,
        default: [],
    })
    roles: UserRole[]

    playerId: PlayerSchema['id']
}
