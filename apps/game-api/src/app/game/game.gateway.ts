import { Server, Socket } from 'socket.io';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Events } from './constants';

@WebSocketGateway(3334, {
    namespace: 'game',
    cors: {
        origin: '*'
    }
})
export class GameGateway {
    @WebSocketServer()
    server: Server


    @SubscribeMessage(Events.START_SEARCH_OPPONENT)
    findOpponent(
        @MessageBody() data: any,
        @ConnectedSocket() client: Socket
    ): Observable<WsResponse<number>> {
        client.join('waiti')

        console.log(data, client)
        return from([1,2,3]).pipe(map(item => ({ event: 'STARTED_GAME', data: item })))
    }
}

