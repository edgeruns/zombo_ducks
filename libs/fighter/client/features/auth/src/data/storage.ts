export type Tokens = {
    accessToken: string
    refreshToken: string
}

export const APP_PREFIX_STORAGE = 'zombofighter_'

export const getAccessToken = (): Tokens['accessToken'] | void => {
    const tokens = window.localStorage.getItem(`${APP_PREFIX_STORAGE}tokens`)

    if (tokens) {
        return JSON.parse(tokens).accessToken
    }
}

export const getRefreshToken = (): Tokens['refreshToken'] | void => {
    const tokens = window.localStorage.getItem(`${APP_PREFIX_STORAGE}tokens`)

    if (tokens) {
        return JSON.parse(tokens).refreshToken
    }
}

export const setTokens = (tokens: Tokens) => {
    window.localStorage.setItem(
        `${APP_PREFIX_STORAGE}tokens`,
        JSON.stringify(tokens)
    )
}
