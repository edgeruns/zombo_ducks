import { GameMeta, PlayerState, RoundResult } from './interfaces';
import { Action } from './action'
import * as fp from 'lodash/fp'

export class Round {
    public actions: Map<PlayerState['uuid'], Action> = new Map()

    protected createdAt: Date = new Date()

    setAction(player: PlayerState['uuid'], action: Action) {
        if (!this.actions.has(player)) {
            this.actions.set(player, action)
        }
    }

    isAllReady(): boolean {
        return this.actions.size === 2
    }

    compute(meta: GameMeta): RoundResult[] {
        if (!this.isAllReady()) {
            throw new Error("U can't compute round cause not enough actions")
        }

        return fp.pipe(
            Object.fromEntries,
            Object.keys,
            (uuids) =>
                fp.map((playerUUID: PlayerState['uuid']) => {
                    const player = this.actions.get(playerUUID)
                    const enemy = fp.pipe(
                        fp.filter((uuid) => uuid !== playerUUID),
                        fp.first,
                        (uuid: PlayerState['uuid']) => this.actions.get(uuid)
                    )(uuids) as Action

                    if (!player || !enemy) {
                        throw new Error('not found enemy or player')
                    }

                    return {
                        uuid: playerUUID,
                        damage:
                            (player.getDamaged(enemy) * 100) / meta.MAX_ROUNDS,
                    }
                })(uuids)
        )(this.actions.entries())
    }
}
