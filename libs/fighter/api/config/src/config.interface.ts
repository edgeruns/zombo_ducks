export type DataBaseConfig = {
    url: string
}

export type AuthConfig = {
    secret: string
    accessExpireTime: string
    refreshExpireTime: string
}

export type RedisConfig = {
    url: string
}

export type AppConfig = {
    port: number
    auth: AuthConfig
    database: DataBaseConfig
    cache: RedisConfig
}
