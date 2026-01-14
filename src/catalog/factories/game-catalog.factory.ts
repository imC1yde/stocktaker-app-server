import { ModuleRef } from '@nestjs/core'
import { GameCatalogResolver } from '@src/catalog/game-catalog/game-catalog.resolver'
import { RawgService } from '@src/catalog/game-catalog/rawg/rawg.service'
import { ICatalogFactory } from '@src/catalog/interfaces/catalog-factory.interface'
import { PrismaService } from '@src/infrastructure/prisma/prisma.service'
import { DataValidatorProvider } from '@src/validator/data/data-validator.provider'
import { GameCatalogService } from '../game-catalog/game-catalog.service'

export class GameCatalogFactory implements ICatalogFactory<GameCatalogService, GameCatalogResolver> {
  constructor(private readonly moduleRef: ModuleRef) {}

  public createService() {
    const prisma = this.moduleRef.get<PrismaService>(PrismaService)
    const dataValidator = this.moduleRef.get<DataValidatorProvider>(DataValidatorProvider)
    return new GameCatalogService(prisma, dataValidator)
  }

  public createResolver(service) {
    const rawgService = this.moduleRef.get<RawgService>(RawgService)

    return new GameCatalogResolver(service, rawgService)
  }
}