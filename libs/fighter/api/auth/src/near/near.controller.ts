import { Controller, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from '../auth.service'

import { NearRequest } from './near.strategy'

@Controller('auth/near')
export class NearController {
    constructor(private readonly _authService: AuthService) {}

    @Put()
    @UseGuards(AuthGuard('near'))
    auth(@Req() req: NearRequest) {
        return this._authService.login({
            user: req.user,
        })
    }
}
