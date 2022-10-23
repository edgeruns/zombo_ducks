import { Body, Controller, Put } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Put('refresh')
  refresh(@Body('token') token: string) {
    return this._authService.refresh(token)
  }
}
