/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { RedisIoAdapter } from './app/adapters/redis-io.adapter'

async function bootstrap() {
    const globalPrefix = 'api'
    const app = await NestFactory.create(AppModule)
    const redisIoAdapter = new RedisIoAdapter(app)

    await redisIoAdapter.connectToRedis()

    app.useWebSocketAdapter(redisIoAdapter)
    app.setGlobalPrefix(globalPrefix, {
        exclude: [
            { path: 'readyz', method: RequestMethod.GET },
            { path: 'healthz', method: RequestMethod.GET },
        ],
    })

    const port = process.env.PORT || 3333
    await app.listen(port)
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    )
}

bootstrap()
