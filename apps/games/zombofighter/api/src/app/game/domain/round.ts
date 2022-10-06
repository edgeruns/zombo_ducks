import { Fighter } from './fighter'
import { Damage } from './damage'
import { Protection } from './protection'

export interface RoundInterface {
    setReady(damage: Damage, protection: Protection)

    isAllReady(): boolean

    compute(maxRounds: number): { health: { fighter: number; enemy: number } }
}

export class Round implements RoundInterface {
    public readonly fighter: Fighter
    public readonly enemy: Fighter

    constructor(fighter: Fighter, enemy: Fighter) {
        this.fighter = fighter
        this.enemy = enemy
    }

    setReady(damage: Damage, protection: Protection) {
        this.fighter.setDamage(damage)
        this.fighter.setProtection(protection)
    }

    compute(maxRounds: number) {
        const actionsFighterOne = this.fighter.getActions()
        const actionsFighterTwo = this.enemy.getActions()

        const fighterOneCount = actionsFighterOne.protection.getCountDamaged(
            actionsFighterTwo.damage
        )

        const fighterTwoCount = actionsFighterTwo.protection.getCountDamaged(
            actionsFighterOne.damage
        )

        const damage = 100 / maxRounds

        this.fighter.health.decrease(fighterOneCount * damage)
        this.enemy.health.decrease(fighterTwoCount * damage)

        return {
            health: {
                fighter: this.fighter.health.getValue(),
                enemy: this.enemy.health.getValue(),
            },
        }
    }

    isAllReady(): boolean {
        return this.fighter.isReady() && this.enemy.isReady()
    }
}
