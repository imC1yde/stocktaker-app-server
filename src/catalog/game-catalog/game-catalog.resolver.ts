import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GameCatalogService } from '@src/catalog/game-catalog/game-catalog.service'
import { RawgService } from '@src/catalog/game-catalog/rawg/rawg.service'
import { mapGame } from '@src/catalog/game-catalog/shared/maps/game.map'
import { mapResultToInput } from '@src/catalog/game-catalog/shared/maps/result-to-input.map'
import { ICatalogResolver } from '@src/catalog/interfaces/catalog-resolver.interface'
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { IsAuthGuard } from '@src/common/guards/is-auth.guard'
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { Game } from '@src/common/types/game.type'
import { firstValueFrom } from 'rxjs'

@UseGuards(IsAuthGuard)
@Resolver()
export class GameCatalogResolver implements ICatalogResolver {
  constructor(
    private readonly gameCatalogService: GameCatalogService,
    private readonly rawgService: RawgService
  ) {}

  findById(...args: any[]): Promise<any> {
    throw new Error('Method not implemented.')
  }

  update(...args: any[]): Promise<any> {
    throw new Error('Method not implemented.')
  }

  delete(...args: any[]): Promise<any> {
    throw new Error('Method not implemented.')
  }

  @Mutation(() => Game, { name: 'addGame' })
  public async create(
    @CurrentUser() user: IUserPayload,
    @Args('id') id: number
  ): Promise<Game> {
    const game = await firstValueFrom(this.rawgService.getById(id))
    const addedGame = await this.gameCatalogService.create(user.sub, mapResultToInput(game.results))

    return mapGame(addedGame)
  }

  public async findAll(): Promise<Game[]> {}

}