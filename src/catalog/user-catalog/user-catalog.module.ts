import { DynamicModule, Module, Type } from '@nestjs/common';
import { ICatalogFactory, ICatalogService } from "@src/catalog/factories/catalog-factory.interfaces";
import { UserCatalogResolver } from '@src/catalog/user-catalog/user-catalog.resolver';
import { UserCatalogService } from '@src/catalog/user-catalog/user-catalog.service';

@Module({
  providers: [
    UserCatalogResolver,
    UserCatalogService
  ]
})
export class UserCatalogModule {
  static register(factory: Type<ICatalogFactory>): DynamicModule {
    return {
      module: UserCatalogModule,
      providers: [
        factory,
        {
          provide: 'UserCatalogService',
          useFactory: (factory: ICatalogFactory) => factory.createService(),
          inject: [ factory ]
        },
        {
          provide: 'UserCatalogResolver',
          useFactory: (factory: ICatalogFactory, service: ICatalogService) => factory.createResolver(service),
          inject: [ factory, 'UserCatalogService' ]
        }
      ]
    }
  }
}
