import { Socket } from 'socket.io'
import { PlayerSchema } from '../schemas/player.schema'
import { Game } from './domain/game';

export interface ClientPlayer {
    player: PlayerSchema
    socket: Socket
    game?: Game
}
