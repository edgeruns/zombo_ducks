import { getAccessToken } from "./storage";

export class AuthService {
    public checkAuth(): boolean {
        const accessToken = getAccessToken()

        if (accessToken) {
            const decoded: { exp: number } = JSON.parse(
                window.atob(accessToken.split('.')[1])
            )

            return decoded.exp > Date.now() / 1000
        }

        return false
    }
}
