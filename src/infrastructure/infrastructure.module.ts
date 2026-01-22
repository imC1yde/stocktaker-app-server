import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@src/infrastructure/config/config.module'
import { IntegrationsModule } from '@src/infrastructure/integrations/integrations.module'
import { PrismaModule } from '@src/infrastructure/prisma/prisma.module'

@Global()
@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    IntegrationsModule
  ],
  exports: [
    ConfigModule,
    PrismaModule,
    IntegrationsModule
  ]
})
export class InfrastructureModule {}
