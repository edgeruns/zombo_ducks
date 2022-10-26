import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Strategy } from "@apps/games/zombofighter/api/passport-near";
import { PlayerSchema, UserSchema } from "@apps/games/zombofighter/api/schemas";
import { Request } from 'express'

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


        return await this._usersRepository.save(this._usersRepository.create({
            nearAddress: address,
            player: new PlayerSchema()
        }))
    }
}
