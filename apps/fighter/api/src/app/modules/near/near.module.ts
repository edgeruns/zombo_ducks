import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { keystoreProvider } from './keystore.provider'
import { nearProvider } from './near.provider'

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [keystoreProvider, nearProvider],
})
export class NearModule {}
