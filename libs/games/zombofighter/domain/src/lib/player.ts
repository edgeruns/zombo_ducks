import { PlayerState } from './interfaces';

export class Player {
    protected uuid: PlayerState['uuid']

    constructor(uuid: PlayerState['uuid']) {
        this.uuid = uuid
    }
}
