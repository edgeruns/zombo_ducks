import { Module } from '@nestjs/common'
import { keystoreProvider } from './keystore.provider'
import { nearProvider } from './near.provider'

@Module({
    providers: [keystoreProvider, nearProvider],
})
export class NearModule {}
