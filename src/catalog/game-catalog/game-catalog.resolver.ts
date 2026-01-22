import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GameCatalogService } from '@src/catalog/game-catalog/game-catalog.service'
import { FindAllGamesFilterInput } from '@src/catalog/game-catalog/inputs/find-all-games.filter.input'
import { FindAllGamesInput } from '@src/catalog/game-catalog/inputs/find-all-games.input'
import { UpdateGameInput } from '@src/catalog/game-catalog/inputs/update-game.input'
import { RawgDomainService } from '@src/catalog/game-catalog/rawg/rawg-domain.service'
import { mapResultToInput } from '@src/catalog/game-catalog/shared/maps/result-to-input.map'
import { ListedGame } from '@src/catalog/game-catalog/shared/types/listed-game.type'
import { ICatalogResolver } from '@src/catalog/interfaces/catalog-resolver.interface'
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { AuthGuard } from '@src/common/guards/auth.guard'
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { Game } from '@src/common/types/game.type'
import type { Nullable } from '@src/common/utils/nullable.util'

// 758455 3328 43050
@UseGuards(AuthGuard)
@Resolver()
export class GameCatalogResolver implements ICatalogResolver {
  constructor(
    private readonly gameCatalogService: GameCatalogService,
    private readonly rawgService: RawgDomainService
  ) {}

  @Query(() => [ ListedGame ], { name: 'findAllGames' })
  public async findAll(
    @CurrentUser() user: IUserPayload,
    @Args('input') input: FindAllGamesInput,
    @Args('filter', { nullable: true }) filter?: FindAllGamesFilterInput
  ): Promise<ListedGame[]> {
    return await this.gameCatalogService.findAll(user.sub, input, filter)
  }

  @Query(() => Game, { name: 'findGameById' })
  public async findById(
    @CurrentUser() user: IUserPayload,
    @Args('id') id: string
  ): Promise<Nullable<Game>> {
    return await this.gameCatalogService.findById(user.sub, id)
  }

  @Mutation(() => Game, { name: 'updateGame' })
  public async update(
    @CurrentUser() user: IUserPayload,
    @Args('id') id: string,
    @Args('input') input: UpdateGameInput
  ): Promise<Game> {
    return await this.gameCatalogService.update(user.sub, id, input)
  }

  @Mutation(() => Game, { name: 'deleteGame' })
  public async delete(
    @CurrentUser() user: IUserPayload,
    @Args('id') id: string
  ): Promise<Game> {
    return await this.gameCatalogService.delete(user.sub, id)
  }

  @Mutation(() => Game, { name: 'addGame' })
  public async create(
    @CurrentUser() user: IUserPayload,
    @Args('id', { type: () => Int }) id: number
  ): Promise<Game> {
    const game = await this.rawgService.getById(id)
    const addedGame = await this.gameCatalogService.create(user.sub, mapResultToInput(game))

    return addedGame
  }
}