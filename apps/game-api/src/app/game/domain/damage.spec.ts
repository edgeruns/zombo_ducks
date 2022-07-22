import { Damage } from './damage'

describe('Damage', () => {
    it('should validate damage', () => {
        const damage = new Damage(true, false, false)
        expect(damage.validate()).toBeTruthy()
    })

    it('should not validate damage', () => {
        const damage = new Damage(true, true, false)
        expect(damage.validate()).toBeFalsy()
    })

    it('should correct convert to bytes', () => {
        const damage = new Damage(true, false, true)
        const bytes = damage.toBytes()
        expect(bytes[0]).toEqual(1)
        expect(bytes[1]).toEqual(0)
        expect(bytes[2]).toEqual(1)
    })

    it('should correct getValue', () => {
        const damage = new Damage(true, false, true)

        expect(damage.getValue()).toEqual({
            head: true,
            body: false,
            legs: true,
        })
    })
})
