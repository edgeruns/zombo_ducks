import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Socket } from 'socket.io';

@Injectable()
export class NearGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const client = context.switchToWs().getClient() as Socket

        return !!client.handshake.headers['wallet']
    }
}
