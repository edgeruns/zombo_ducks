import { Server, Socket } from 'socket.io'
import {
    ConnectedSocket, MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Events } from './constants'
import { GameService, Rooms } from './game.service'
import { UseGuards } from '@nestjs/common'
import { NearGuard } from '../modules/near/near.guard'
import { MoveDto } from './game.dto';

@WebSocketGateway(3334, {
    namespace: 'game',
    cors: {
        origin: '*',
    },
})
export class GameGateway {
    constructor(private readonly service: GameService) {}

    @WebSocketServer()
    server: Server

    @UseGuards(NearGuard)
    async handleConnection(@ConnectedSocket() socket: Socket) {
        await this.service.joinPlayer(socket)
        return this.service.destroy(socket)
    }


    @UseGuards(NearGuard)
    @SubscribeMessage(Events.START_SEARCH_OPPONENT)
    async findOpponent(socket: Socket) {
        return this.service.searchOpponent(this.server, socket)
    }


    @UseGuards(NearGuard)
    @SubscribeMessage(Events.MAKE_MOVE)
    async makeMove(
        @MessageBody()
        data: MoveDto,

        @ConnectedSocket()
        socket: Socket
    ) {
        return this.service.makeMove(socket, data)
    }
}
