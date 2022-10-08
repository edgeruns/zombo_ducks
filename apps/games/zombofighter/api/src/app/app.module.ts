import { Module } from '@nestjs/common'

import { GameModule } from './game/game.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import schemas from './schemas'
import { NearModule } from './modules/near/near.module'
import { AppController } from './app.controller';

@Module({
    controllers: [AppController],
    imports: [
        NearModule,
        GameModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            port: 5432,
            username: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            entities: schemas,
            synchronize: process.env.DB_SYNC === 'true',
        }),
    ],
})
export class AppModule {}
