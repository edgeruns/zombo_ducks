import { Module } from '@nestjs/common'
import { keystoreProvider } from './keystore.provider'
import { nearProvider } from './near.provider'
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot()],
    providers: [keystoreProvider, nearProvider],
})
export class NearModule {}
