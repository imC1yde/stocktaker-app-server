import { Module } from '@nestjs/common'
import { GameCatalogFactory } from '@src/catalog/factories/game-catalog.factory'
import { UserCatalogFactory } from "@src/catalog/factories/user-catalog.factory"
import { GameCatalogModule } from '@src/catalog/game-catalog/game-catalog.module'
import { UserCatalogModule } from '@src/catalog/user-catalog/user-catalog.module'

@Module({
  imports: [
    UserCatalogModule.register(UserCatalogFactory),
    GameCatalogModule.register(GameCatalogFactory)
  ]
})
export class CatalogModule {}
