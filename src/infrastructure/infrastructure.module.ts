import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@src/infrastructure/config/config.module'
import { JwtConfig } from '@src/infrastructure/config/jwt.config'
import { IntegrationsModule } from '@src/infrastructure/integrations/integrations.module'
import { PrismaModule } from '@src/infrastructure/prisma/prisma.module'
import { RedisModule } from '@src/infrastructure/redis/redis.module'
import { S3Module } from '@src/infrastructure/s3/s3.module'

@Global()
@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    IntegrationsModule,
    S3Module,
    RedisModule,
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
    S3Module,
    RedisModule
  ]
})
export class InfrastructureModule {}
