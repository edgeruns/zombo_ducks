import { Protection } from './protection'
import { Damage } from './damage';

describe('Protection', () => {

    it('should validate protection', () => {
        const protection = new Protection(true, true, false)
        expect(protection.validate()).toBeTruthy()
    })

    it('should not validate protection', () => {
        const protection = new Protection(true, true, true)
        expect(protection.validate()).toBeFalsy()
    })

    it('should correct convert to bytes', () => {
        const protection = new Protection(true, false, false)
        const bytes = protection.toBytes()
        expect(bytes[0]).toEqual(1)
        expect(bytes[1]).toEqual(0)
        expect(bytes[2]).toEqual(0)
    })

    it('should correct getValue', () => {
        const protection = new Protection(true, false, true)

        expect(protection.getValue()).toEqual({
            head: true,
            body: false,
            legs: true,
        })
    })

    it('should return correct count damage', () => {
        const protection = new Protection(true, false, true)
        expect(protection.getCountDamaged(new Damage(true, false, false))).toEqual(0)
        expect(protection.getCountDamaged(new Damage(false, true, false))).toEqual(1)
    })
})
