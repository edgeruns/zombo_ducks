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
    public readonly health = new Health(100)

    private protection: Protection
    private damage: Damage

    constructor(player: Player) {
        this.player = player
    }

    setProtection(protection: Protection) {
        this.protection = protection
    }

    setDamage(damage: Damage) {
        this.damage = damage
    }

    getActions() {
        if (!this.protection || !this.damage) return undefined

        return {
            damage: this.damage,
            protection: this.protection,
        }
    }

    isReady(): boolean {
        return !!this.damage && !!this.protection
    }

    isLiving(): boolean {
        return this.health.getValue() > 0
    }
}
