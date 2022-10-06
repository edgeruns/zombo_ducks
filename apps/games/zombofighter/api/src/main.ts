/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'
import { RedisIoAdapter } from './app/adapters/redis-io.adapter'

async function bootstrap() {
    const globalPrefix = 'api'
    const app = await NestFactory.create(AppModule)
    const redisIoAdapter = new RedisIoAdapter(app)

    await redisIoAdapter.connectToRedis()

    app.useWebSocketAdapter(redisIoAdapter)
    app.setGlobalPrefix(globalPrefix)

    const port = process.env.PORT || 3333
    await app.listen(port)
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    )
}

bootstrap()
