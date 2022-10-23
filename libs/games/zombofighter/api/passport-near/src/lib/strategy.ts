import * as passport from 'passport-strategy'
import * as near from 'near-api-js'
import { Request } from 'express'

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
        const { accountId } = req.body

        if (!accountId) {
            return this.fail({ message: 'Missing credentials' }, 400)
        }


        //
        // try {
        //     if (this._passReqToCallback) {
        //         this._verify(req, recoveredAddress, nonce, this.verified)
        //     } else {
        //         this._verify(recoveredAddress, nonce, this.verified)
        //     }
        // } catch (ex) {
        //     return this.error(ex)
        // }
    }

    private verified(err, user, info) {
        if (err) return this.error(err)
        if (!user) return this.fail(info)
        this.success(user, info)
    }
}
