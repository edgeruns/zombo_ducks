import { PlayerState } from './interfaces';

export class Player {
    public readonly uuid: PlayerState['uuid']
    public readonly statistic: PlayerState['statistic']

    constructor(uuid: PlayerState['uuid'], statistic: PlayerState['statistic']) {
        this.uuid = uuid
        this.statistic = statistic
    }
}
