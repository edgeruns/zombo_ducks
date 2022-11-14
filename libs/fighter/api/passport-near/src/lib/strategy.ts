import { Request } from 'express'
import * as near from 'near-api-js'
import { PublicKey } from 'near-api-js/lib/utils'
import * as passport from 'passport-strategy'

export class Strategy extends passport.Strategy {
    public readonly name = 'near'
    private readonly _verify: any
    private readonly _passReqToCallback: boolean

    constructor(options, verify) {
        super()

        if (typeof options === 'function') {
            verify = options
            options = {}
        }

        if (!verify) {
            throw new TypeError('MetamaskStrategy requires a verify callback')
        }

        this._verify = verify
        this._passReqToCallback = options._passReqToCallback
    }

    authenticate(req: Request) {
        const { publicKey, signature, timestamp, accountId } = req.body

        if (!publicKey || !signature || !timestamp || !accountId) {
            return this.fail({ message: 'Missing credentials' }, 400)
        }

        if (isNaN(+timestamp)) {
            return this.fail({ message: 'TimeStamp is not a number' }, 400)
        }

        const isVerified = PublicKey.from(publicKey).verify(
            Buffer.from(timestamp.toString()),
            Uint8Array.from(Buffer.from(signature, 'base64'))
        )

        if (!isVerified) {
            return this.fail({ message: 'Invalid signature' }, 400)
        }

        try {
            if (this._passReqToCallback) {
                this._verify(req, accountId, undefined, (err, user, info) =>
                    this.verified(err, user, info)
                )
            } else {
                this._verify(accountId, undefined, (err, user, info) =>
                    this.verified(err, user, info)
                )
            }
        } catch (ex) {
            return this.error(ex)
        }
    }

    private verified(err, user, info) {
        if (err) return this.error(err)
        if (!user) return this.fail(info)
        this.success(user, info)
    }
}
