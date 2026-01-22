import { Module } from '@nestjs/common'
import { GameCatalogModule } from '@src/catalog/game-catalog/game-catalog.module'
import { UserCatalogModule } from '@src/catalog/user-catalog/user-catalog.module'

@Module({
  providers: [],
  imports: [
    UserCatalogModule,
    GameCatalogModule
  ]
})
export class CatalogModule {}
