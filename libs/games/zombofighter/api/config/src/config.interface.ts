export type DataBaseConfig = {
    name: string
    host: string
    port: number
    username: string
    password: string
}

export type AuthConfig = {
    secret: string
    accessExpireTime: string
    refreshExpireTime: string
}

export type RedisConfig = {
    host: string
    port: number
    username: string
    password: string
    db: number
}

export type AppConfig = {
    port: number
    auth: AuthConfig
    database: DataBaseConfig
    cache: RedisConfig
}
