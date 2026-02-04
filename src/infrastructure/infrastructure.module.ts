import KeyvRedis from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@src/infrastructure/config/config.module'
import { JwtConfig } from '@src/infrastructure/config/jwt.config'
import { RedisConfig } from '@src/infrastructure/config/redis.config'
import { IntegrationsModule } from '@src/infrastructure/integrations/integrations.module'
import { PrismaModule } from '@src/infrastructure/prisma/prisma.module'
import { S3Module } from '@src/infrastructure/s3/s3.module'

@Global()
@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    IntegrationsModule,
    S3Module,
    CacheModule.registerAsync({
      useFactory: async (config: RedisConfig) => ({
        stores: [
          new KeyvRedis({
            host: config.host satisfies string,
            port: config.port satisfies number,
            password: config.password satisfies string
          })
        ],
        ttl: 600
      })
    }),
    JwtModule.registerAsync({
      global: true,
      inject: [ JwtConfig ],
      useFactory: (config: JwtConfig) => ({
        secret: config.jwtSecret
      })
    })
  ],
  exports: [
    ConfigModule,
    PrismaModule,
    IntegrationsModule,
    S3Module
  ]
})
export class InfrastructureModule {}
