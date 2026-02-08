import KeyvRedis from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { RedisConfig } from '@src/infrastructure/config/redis.config'
import { RedisService } from '@src/infrastructure/redis/redis.service'

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ RedisConfig ],
      useFactory: async (config: RedisConfig) => ({
        stores: [
          new KeyvRedis(`redis://${config.host}:${config.port}`)
        ]
      })
    })
  ],
  providers: [
    RedisService
  ],
  exports: [
    RedisService
  ]
})
export class RedisModule {}