import { AppConfig } from '@apps/games/zombofighter/api/config'

export default (): AppConfig => ({
    port: parseInt(process.env.PORT, 10) || 3333,
    auth: {
        secret: process.env['JWT_SECRET'],
        accessExpireTime: '1h',
        refreshExpireTime: '30d',
    },
    cache: {
        host: process.env['REDIS_HOST'],
        password: process.env['REDIS_PASSWORD'],
        username: process.env['REDIS_USERNAME'],
        port: parseInt(process.env['REDIS_PORT'], 10) || 6379,
        db: 0,
    },
    database: {
        name: process.env['DB_NAME'],
        host: process.env['DB_HOST'],
        port: parseInt(process.env['DB_PORT'], 10) || 5432,
        username: process.env['DB_USER'],
        password: process.env['DB_PASSWORD'] || undefined,
    },
})
