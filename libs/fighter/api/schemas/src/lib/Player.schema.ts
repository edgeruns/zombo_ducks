import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('players')
export class PlayerSchema {
    @PrimaryGeneratedColumn('uuid')
    id: string
}
