import { PlayerState } from './interfaces';

export class Player {
    public readonly uuid: PlayerState['uuid']
    public readonly statistic: PlayerState['statistic'] = {
        wins: 0,
        loses: 0,
        draws: 0
    }

    constructor(uuid: PlayerState['uuid'], statistic: PlayerState['statistic']) {
        this.uuid = uuid
        this.statistic = statistic
    }
}
