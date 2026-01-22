import { Module } from '@nestjs/common'
import { UserCatalogResolver } from '@src/catalog/user-catalog/user-catalog.resolver'
import { UserCatalogService } from '@src/catalog/user-catalog/user-catalog.service'

@Module({
  providers: [
    UserCatalogService,
    UserCatalogResolver
  ]
})
export class UserCatalogModule {}
