import { BasicActionInterface, SerializedParams } from './interfaces';

export class Damage implements BasicActionInterface {
    private readonly head: boolean
    private readonly body: boolean
    private readonly legs: boolean

    constructor(head: boolean, body: boolean, legs: boolean) {
        this.head = head
        this.body = body
        this.legs = legs
    }

    public static fromBytes(bytes: Uint8Array) {
        return new Damage(!!bytes[0], !!bytes[1], !!bytes[2])
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

        return value.reduce((t, i) => t + i, 0) < 2
    }
}
