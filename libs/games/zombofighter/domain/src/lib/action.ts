import { BodyParts } from './interfaces'

export class Action {
    public readonly damage: BodyParts = [0, 0, 0]
    public readonly protection: BodyParts = [0, 0, 0]

    constructor(damage: BodyParts, protection: BodyParts) {
        this.damage = damage
        this.protection = protection
    }

    validate() {
        const isValidDamage = this.damage.reduce((t, i) => t + i, 0) < 2
        const isValidProtection =
            this.protection.reduce((t, i) => t + i, 0) <= 2

        return isValidDamage && isValidProtection
    }

    getDamaged(enemyAction: Action): number {
        const enemyDamage = enemyAction.damage

        return this.protection.reduce((count, current, index) => {
            const value = enemyDamage[index]
            let counter = count

            if (value !== current && current === 0) {
                counter++
            }

            return counter
        }, 0)
    }
}
