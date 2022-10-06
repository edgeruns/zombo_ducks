import { Injectable, Logger } from '@nestjs/common'
import { Server, Socket } from 'socket.io'
import { Events } from './constants'
import { PlayersService } from '../players/players.service'
import { ClientPlayer } from './typings'
import { GameSchema } from '../schemas/game.schema'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Game, StatusGame } from './domain/game'
import { Fighter } from './domain/fighter'
import { Player } from './domain/player'
import { CacheService } from './cache.service'
import { Damage } from './domain/damage'
import { MoveDto } from './game.dto'
import { Protection } from './domain/protection'

export enum Rooms {
    WAITING = 'waiting',
}

@Injectable()
export class GameService {
    private readonly clients: Map<string, ClientPlayer> = new Map()
    private readonly idToWallet: Map<string, string> = new Map()
    private readonly logger = new Logger(GameService.name)

    constructor(
        private readonly cacheService: CacheService,
        private readonly playerService: PlayersService,
        @InjectRepository(GameSchema)
        private readonly repository: Repository<GameSchema>
    ) {}

    async joinPlayer(io: Socket) {
        const client = await this.register(io)

        if (client.game) {
            await client.socket.join(client.game.id)
            client.socket.emit(Events.RESUME_GAME, client.game.getSnapshot())
        }
    }

    async searchOpponent(server: Server, io: Socket) {
        const client = await this.register(io)
        const waiters: string[] = []

        if (client.game) {
            await client.socket.join(client.game.id)
            client.socket.emit(Events.RESUME_GAME, client.game.getSnapshot())
        }

        io.join(Rooms.WAITING)

        const ids = await io.in(Rooms.WAITING).allSockets()

        ids.forEach((id) => {
            if (id !== client.socket.id) {
                waiters.push(id)
            }
        })

        if (waiters.length) {
            const enemyWalletAddr = this.idToWallet.get(waiters[0])
            const enemy = this.clients.get(enemyWalletAddr)

            console.log('creating fight room')
            console.log(`Player "${io.id}" with enemy "${enemy.socket.id}"`)

            const playerFighter = new Fighter(
                new Player({
                    nickname: client.player.getNickname(),
                    avatar: '',
                    wins: client.player.getCountWins(),
                    loses: client.player.getCountLoses(),
                    id: client.player.wallet,
                })
            )

            const enemyFighter = new Fighter(
                new Player({
                    nickname: enemy.player.getNickname(),
                    avatar: '',
                    wins: enemy.player.getCountWins(),
                    loses: enemy.player.getCountLoses(),
                    id: enemy.player.wallet,
                })
            )

            const game = Game.create(playerFighter, enemyFighter)
            const gameEntity = await this.repository.save({
                id: game.id,
                snapshot: game.getSnapshot(),
                status: game.status,
            })

            await Promise.all([
                client.socket.leave(Rooms.WAITING),
                enemy.socket.leave(Rooms.WAITING),
            ])

            await Promise.all([
                client.socket.join(`game:${gameEntity.id}`),
                enemy.socket.join(`game:${gameEntity.id}`),
            ])

            io.emit(Events.START_FIGHT, {
                game: game.id,
                status: game.status,
                enemy: {
                    nickname: enemy.player.getNickname(),
                    wins: enemy.player.getCountWins(),
                    loses: enemy.player.getCountLoses(),
                    avatar: '',
                },
            })

            enemy.socket.emit(Events.START_FIGHT, {
                game: game.id,
                status: game.status,
                enemy: {
                    nickname: client.player.getNickname(),
                    wins: client.player.getCountWins(),
                    loses: client.player.getCountLoses(),
                    avatar: '',
                },
            })

            client.game = game
            enemy.game = game

            await this.cacheService.create(game)

            console.log(await io.in(`game:${gameEntity.id}`).allSockets())
        }
    }

    async makeMove(io: Socket, data: MoveDto) {
        const playerId = this.idToWallet.get(io.id)
        const client = this.clients.get(playerId)
        // check in list

        const snapshot = await this.cacheService.getGameByPlayer(playerId)

        if (snapshot) {
            const game = Game.setup(snapshot, playerId)
            const enemy = this.clients.get(game.enemy.player.id)

            game.doAction(
                new Damage(
                    data.damage.head,
                    data.damage.body,
                    data.damage.legs
                ),
                new Protection(
                    data.protection.head,
                    data.protection.body,
                    data.protection.legs
                )
            )

            console.log(game.rounds.length)

            game.run()

            this.logger.debug(`Before: ${game.status}`)
            if (game.status === StatusGame.NEXT_ROUND_STARTED) {
                await Promise.all([
                    client.socket.emit(Events.NEXT_ROUND, game.getSnapshot()),
                    enemy.socket.emit(Events.NEXT_ROUND, game.getSnapshot()),
                ])

                game.nextRound()
            }

            await this.cacheService.updateGame(game)

            this.logger.debug(`After: ${game.status}`)
        }
    }

    private async register(io: Socket): Promise<ClientPlayer> {
        const wallet = io.handshake.headers['wallet'] as string
        const player = await this.playerService.find(wallet)
        const clientPlayer: ClientPlayer = {
            socket: io,
            player,
        }

        if (await this.cacheService.checkPlayer(player.wallet)) {
            this.logger.debug(`Player: ${player.wallet} found in cache`)

            const cachedGame = await this.cacheService.getGameByPlayer(
                player.wallet
            )

            if (!cachedGame) {
                const gameId = await this.cacheService.getGameIdByPlayer(
                    player.wallet
                )
                const schema = await this.repository.findOne({
                    where: { id: gameId },
                })

                if (schema.status === StatusGame.FINISHED) {
                    this.logger.warn(
                        'Found game in status FINISHED but not cleared player in redis cache'
                    )
                } else {
                    clientPlayer.game = await this.cacheService.create(
                        Game.setup(schema.snapshot, player.wallet)
                    )
                }
            } else {
                clientPlayer.game = Game.setup(cachedGame, player.wallet)
            }
        }

        this.clients.set(wallet, clientPlayer)
        this.idToWallet.set(io.id, wallet)

        return clientPlayer
    }

    async destroy(io: Socket) {
        const wallet = io.handshake.headers['wallet'] as string
        const client = this.clients.get(wallet)

        if (client && client.game) {
            this.clients.delete(wallet)
            this.idToWallet.delete(io.id)
            await this.cacheService.destroyGame(
                client.game.id,
                client.player.wallet
            )

            client.socket.rooms.delete(client.game.id)

            await this.repository.delete(client.game.id)
        }
    }
}
