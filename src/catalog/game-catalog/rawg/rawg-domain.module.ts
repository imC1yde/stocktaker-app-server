import { Module } from '@nestjs/common'
import { RawgDomainResolver } from '@src/catalog/game-catalog/rawg/rawg-domain.resolver'
import { RawgDomainService } from '@src/catalog/game-catalog/rawg/rawg-domain.service'
import { IntegrationsModule } from '@src/infrastructure/integrations/integrations.module'

@Module({
  providers: [
    RawgDomainService,
    RawgDomainResolver
  ],
  imports: [
    IntegrationsModule
  ],
  exports: [
    RawgDomainService
  ]
})
export class RawgDomainModule {}