import { ConfigifyModule } from '@itgorillaz/configify'
import { Module } from '@nestjs/common'

require('dotenv').config()

@Module({
  imports: [
    ConfigifyModule.forRootAsync({
      configFilePath: [ '.env.local', 'external-api.yml' ]
    })
  ],
  exports: [ ConfigifyModule ]
})
export class ConfigModule {}