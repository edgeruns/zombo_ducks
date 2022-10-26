import { AppConfig } from '@apps/games/zombofighter/api/config'

export default (): AppConfig => ({
    port: parseInt(process.env.PORT, 10) || 3333,
    auth: {
        secret: process.env['JWT_SECRET'],
        accessExpireTime: '1h',
        refreshExpireTime: '30d',
    },
    cache: {
        url: process.env['REDIS_URL'],
    },
    database: {
        url: process.env['DATABASE_URL'],
    },
})
