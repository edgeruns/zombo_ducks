import { BasicActionInterface, SerializedParams } from './interfaces'
import { Damage } from './damage'
import { current } from '@reduxjs/toolkit'

export class Protection implements BasicActionInterface {
    private readonly head: boolean
    private readonly body: boolean
    private readonly legs: boolean

    constructor(head: boolean, body: boolean, legs: boolean) {
        this.head = head
        this.body = body
        this.legs = legs
    }

    toBytes() {
        const buffer = new Uint8Array(3)

        buffer[0] = +this.head
        buffer[1] = +this.body
        buffer[2] = +this.legs

        return buffer
    }

    getValue(): SerializedParams {
        return {
            head: this.head,
            body: this.body,
            legs: this.legs,
        }
    }

    validate() {
        const value = this.toBytes()

        return value.reduce((t, i) => t + i, 0) <= 2
    }

    getCountDamaged(damage: Damage): number {
        const damageBytes = damage.toBytes()
        const protectionBytes = this.toBytes()

        return protectionBytes.reduce((count, current, index) => {
            const damageValue = damageBytes[index]
            let counter = count

            if ((damageValue !== current) && current === 0) {
                counter++
            }

            return counter
        }, 0)
    }
}
