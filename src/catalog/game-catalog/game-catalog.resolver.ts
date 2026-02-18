import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GameCatalogService } from '@src/catalog/game-catalog/game-catalog.service'
import { RawgDomainService } from '@src/catalog/game-catalog/rawg/rawg-domain.service'
import { FindAllGamesFilterInput } from '@src/catalog/game-catalog/shared/inputs/find-all-games.filter.input'
import { FindAllGamesInput } from '@src/catalog/game-catalog/shared/inputs/find-all-games.input'
import { UpdateGameInput } from '@src/catalog/game-catalog/shared/inputs/update-game.input'
import { mapResultToInput } from '@src/catalog/game-catalog/shared/maps/result-to-input.map'
import { PaginatedGames } from '@src/catalog/game-catalog/shared/types/paginated-games.type'
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { AuthGuard } from '@src/common/guards/auth.guard'
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { Game } from '@src/common/types/game.type'
import type { Nullable } from '@src/common/utils/nullable.util'

@UseGuards(AuthGuard)
@Resolver()
export class GameCatalogResolver {
  constructor(
    private readonly gameCatalogService: GameCatalogService,
    private readonly rawgService: RawgDomainService
  ) {}

  @Query(() => PaginatedGames, { name: 'findAllGames' })
  public async findAll(
    @CurrentUser() user: IUserPayload,
    @Args('input') input: FindAllGamesInput,
    @Args('filter', { nullable: true }) filter?: FindAllGamesFilterInput
  ): Promise<PaginatedGames> {
    return await this.gameCatalogService.findAll(user.sub, input, filter)
  }

  @Query(() => Game, { name: 'findGameById', nullable: true })
  public async findById(
    @CurrentUser() user: IUserPayload,
    @Args('id') id: string
  ): Promise<Nullable<Game>> {
    return await this.gameCatalogService.findById(user.sub, id)
  }

  @Mutation(() => Game, { name: 'updateGame' })
  public async update(
    @CurrentUser() user: IUserPayload,
    @Args('input') input: UpdateGameInput
  ): Promise<Game> {
    return await this.gameCatalogService.update(user.sub, input)
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