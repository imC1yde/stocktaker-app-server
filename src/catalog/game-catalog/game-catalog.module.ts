import { Module } from '@nestjs/common'
import { GameCatalogResolver } from '@src/catalog/game-catalog/game-catalog.resolver'
import { GameCatalogService } from '@src/catalog/game-catalog/game-catalog.service'
import { RawgDomainModule } from '@src/catalog/game-catalog/rawg/rawg-domain.module'

@Module({
  providers: [
    GameCatalogService,
    GameCatalogResolver
  ],
  imports: [
    RawgDomainModule
  ]
})
export class GameCatalogModule {}