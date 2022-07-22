import { Player } from './player'
import { Damage } from './damage'
import { Protection } from './protection'
import { Health } from './health'

export interface FighterInterface {
    setDamage(damage: Damage)

    setProtection(protection: Protection)

    getActions(): { damage: Damage, protection: Protection }

    isReady(): boolean
}

export class Fighter implements FighterInterface {
    public readonly player: Player
    public readonly health: Health

    private protection: Protection
    private damage: Damage

    constructor(player: Player, health: Health) {
        this.player = player
        this.health = health
    }

    setProtection(protection: Protection) {
        this.protection = protection
    }

    setDamage(damage: Damage) {
        this.damage = damage
    }

    getActions() {
        return {
            damage: this.damage,
            protection: this.protection,
        }
    }

    isReady(): boolean {
        return !!this.damage && !!this.protection
    }
}
