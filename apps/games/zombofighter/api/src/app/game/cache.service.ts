import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'
import { Game, GameSnapshot } from './domain/game'
import { merge } from 'lodash'

@Injectable()
export class CacheService {
    private readonly ACTIVE_ROOMS_IDS_KEY = 'active_rooms'
    private readonly ACTIVE_ROOM_PREFIX = 'active_room'
    private readonly PLAYER_PREFIX = 'player'

    constructor(
        @Inject(CACHE_MANAGER)
        private cacheManager: Cache
    ) {}

    async create(game: Game): Promise<Game> {
        if (await this.check(game)) return game

        return this.addGame(game)
    }

    async checkPlayer(playerId: string): Promise<boolean> {
        return !!(await this.cacheManager.get(this.getPlayerKey(playerId)))
    }

    async getGameIdByPlayer(id: string) {
        return (await this.cacheManager.get(this.getPlayerKey(id))) as string
    }

    async check(game: Game) {
        const games = await this.getGamesIds()

        return !!games.find((id) => game.id === id)
    }

    async getGameByPlayer(id: string) {
        const gameId = await this.getGameIdByPlayer(id)

        return (await this.cacheManager
            .get(this.getRoomKey(gameId))
            .then((res: string) => JSON.parse(res))) as Promise<GameSnapshot>
    }

    async getGame(id: string) {
        return (await this.cacheManager
            .get(this.getRoomKey(id))
            .then((res: string) => JSON.parse(res))) as Promise<GameSnapshot>
    }

    async updateGame(game: Game) {
        const cachedSnapshot = await this.getGame(game.id)

        if (!cachedSnapshot) {
            await this.create(game)
        }

        console.log('Cached Snap ', cachedSnapshot.rounds.length)

        const snapshot = game.getSnapshot()

        console.log('Current Snap ', snapshot.rounds.length)

        await this.cacheManager.set(
            this.getRoomKey(game.id),
            JSON.stringify({
                ...cachedSnapshot,
                ...snapshot,
                rounds: snapshot.rounds.map((round, index) => {
                    const cachedRound = cachedSnapshot.rounds[index]

                    if (cachedRound) {
                        return { ...cachedRound, ...round }
                    }

                    return round
                }),
            } as GameSnapshot)
        )
    }

    async destroyGame(id: string, by: string) {
        const snapshot = await this.getGame(id)
        const game = Game.setup(snapshot, by)

        await this.cacheManager.del(this.getRoomKey(game.id))
        await this.cacheManager.del(this.getPlayerKey(game.fighter.player.id))
        await this.cacheManager.del(this.getPlayerKey(game.enemy.player.id))
        await this.cacheManager.del(this.ACTIVE_ROOMS_IDS_KEY)
    }

    private async getGamesIds(): Promise<string[]> {
        return await this.cacheManager
            .get(this.ACTIVE_ROOMS_IDS_KEY)
            .then((res: string) => JSON.parse(res))
            .then((res: string[]) => res || [])
    }

    private async addGame(game: Game) {
        const games = await this.getGamesIds()

        games.push(game.id)

        await this.cacheManager.set(
            this.getRoomKey(game.id),
            JSON.stringify(game.getSnapshot())
        )
        await this.cacheManager.set(
            this.ACTIVE_ROOMS_IDS_KEY,
            JSON.stringify(games)
        )
        await this.cacheManager.set(
            this.getPlayerKey(game.fighter.player.id),
            game.id
        )
        await this.cacheManager.set(
            this.getPlayerKey(game.enemy.player.id),
            game.id
        )

        return game
    }

    private getPlayerKey(id: string) {
        return `${this.PLAYER_PREFIX}:${id}`
    }

    private getRoomKey(id: string) {
        return `${this.ACTIVE_ROOM_PREFIX}:${id}`
    }
}
