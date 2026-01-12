import { HttpModule } from '@nestjs/axios'
import { DynamicModule, Module, Type } from '@nestjs/common'
import { ICatalogFactory, ICatalogService } from '@src/catalog/factories/catalog-factory.interfaces'
import { GameCatalogResolver } from '@src/catalog/game-catalog/game-catalog.resolver'
import { GameCatalogService } from '@src/catalog/game-catalog/game-catalog.service'
import { RawgModule } from '@src/catalog/game-catalog/rawg/rawg.module'

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
          provide: 'GameCatalogService',
          useFactory: (factory: ICatalogFactory) => factory.createService(),
          inject: [ factory ]
        },
        {
          provide: 'GameCatalogResolver',
          useFactory: (factory: ICatalogFactory, service: ICatalogService) => factory.createResolver(service),
          inject: [ factory, 'GameCatalogService' ]
        }
      ]
    }
  }
}