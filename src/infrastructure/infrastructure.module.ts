import { Global, Module } from '@nestjs/common'
import { UploadScalar } from '@src/common/scalars/upload.scalar'
import { ConfigModule } from '@src/infrastructure/config/config.module'
import { IntegrationsModule } from '@src/infrastructure/integrations/integrations.module'
import { PrismaModule } from '@src/infrastructure/prisma/prisma.module'
import { S3Module } from '@src/infrastructure/s3/s3.module'

@Global()
@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    IntegrationsModule,
    S3Module
  ],
  exports: [
    ConfigModule,
    PrismaModule,
    IntegrationsModule,
    S3Module
  ],
  providers: [
    UploadScalar
  ]
})
export class InfrastructureModule {}
