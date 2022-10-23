import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { UserSchema } from "./User.schema";

@Entity({ name: 'sessions' })
export class SessionSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ default: true })
    active: boolean

    @ManyToOne(() => UserSchema, (user) => user.sessions)
    user: UserSchema

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
