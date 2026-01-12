import { Module } from '@nestjs/common';
import { UserCatalogFactory } from "@src/catalog/factories/user-catalog.factory";
import { UserCatalogModule } from '@src/catalog/user-catalog/user-catalog.module';

@Module({
  imports: [
    UserCatalogModule.register(UserCatalogFactory)
  ]
})
export class CatalogModule {}
