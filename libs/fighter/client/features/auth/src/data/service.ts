import axios from 'axios'

import { getAccessToken, getRefreshToken, setTokens, Tokens } from './storage'

export class AuthService {
    public async checkAuth(): Promise<boolean> {
        const accessToken = getAccessToken()
        const refreshToken = getRefreshToken()

        if (accessToken) {
            const decoded: { exp: number } = JSON.parse(
                window.atob(accessToken.split('.')[1])
            )

            if (decoded.exp > Date.now() / 1000) {
                return true
            }

            if (refreshToken) {
                const decoded: { exp: number } = JSON.parse(
                    window.atob(refreshToken.split('.')[1])
                )

                if (decoded.exp > Date.now() / 1000) {
                    return true
                }

                const tokens = await axios
                    .put<Tokens>('/auth/refresh', { token: refreshToken })
                    .then((res) => res.data)

                setTokens(tokens)

                return true
            }
        }

        return false
    }
}
