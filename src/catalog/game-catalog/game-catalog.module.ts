import { HttpModule } from '@nestjs/axios'
import { DynamicModule, Module, Type } from '@nestjs/common'
import { GameCatalogResolver } from '@src/catalog/game-catalog/game-catalog.resolver'
import { GameCatalogService } from '@src/catalog/game-catalog/game-catalog.service'
import { RawgModule } from '@src/catalog/game-catalog/rawg/rawg.module'
import { ICatalogFactory } from '@src/catalog/interfaces/catalog-factory.interface'
import { ICatalogService } from '@src/catalog/interfaces/catalog-service.interface'

@Module({
  providers: [
    GameCatalogResolver,
    GameCatalogService
  ],
  imports: [
    HttpModule,
    RawgModule
  ]
})
export class GameCatalogModule {
  static register(factory: Type<ICatalogFactory>): DynamicModule {
    return {
      module: GameCatalogModule,
      providers: [
        factory,
        {
          provide: 'GAME_CATALOG_SERVICE',
          useFactory: (factory: ICatalogFactory) => factory.createService(),
          inject: [ factory ]
        },
        {
          provide: 'GAME_CATALOG_RESOLVER',
          useFactory: (factory: ICatalogFactory, service: ICatalogService) => factory.createResolver(service),
          inject: [ factory, 'GAME_CATALOG_SERVICE' ]
        }
      ]
    }
  }
}