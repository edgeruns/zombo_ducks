import { Strategy } from '@apps/fighter/api/passport-near'
import { PlayerSchema, UserSchema } from '@apps/fighter/api/schemas'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'express'
import { Repository } from 'typeorm'

export interface NearRequest extends Request {
    user: UserSchema
}

@Injectable()
export class NearStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserSchema)
        private readonly _usersRepository: Repository<UserSchema>
    ) {
        super()
    }

    async validate(address: string): Promise<UserSchema> {
        const user = await this._usersRepository.findOne({
            where: {
                nearAddress: address,
            },
        })

        if (user) return user

        return await this._usersRepository.save(
            this._usersRepository.create({
                nearAddress: address,
                player: new PlayerSchema(),
            })
        )
    }
}
