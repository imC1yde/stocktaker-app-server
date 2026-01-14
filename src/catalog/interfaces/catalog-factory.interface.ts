import { ICatalogResolver } from '@src/catalog/interfaces/catalog-resolver.interface'
import { ICatalogService } from '@src/catalog/interfaces/catalog-service.interface'

export interface ICatalogFactory<
  TService extends ICatalogService = ICatalogService,
  TResolver extends ICatalogResolver = ICatalogResolver
> {
  createService(): TService

  createResolver(services: TService): TResolver
}