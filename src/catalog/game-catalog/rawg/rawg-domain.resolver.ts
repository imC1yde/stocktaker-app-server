import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { RawgDomainService } from '@src/catalog/game-catalog/rawg/rawg-domain.service'
import { GetRawgGamesInput } from '@src/catalog/game-catalog/rawg/shared/inputs/get-rawg-games.input'
import { mapRawgList } from '@src/catalog/game-catalog/shared/maps/rawg-list.map'
import { RawgGame } from '@src/catalog/game-catalog/shared/types/rawg-game.type'
import { AuthGuard } from '@src/common/guards/auth.guard'


@UseGuards(AuthGuard)
@Resolver()
export class RawgDomainResolver {
  constructor(private readonly rawgService: RawgDomainService) {}

  @Query(() => [ RawgGame ], { name: 'getRawgGames' })
  public async getRawgGames(@Args('input') input: GetRawgGamesInput): Promise<RawgGame[]> {
    const data = await this.rawgService.getAll(input)

    return mapRawgList(data.results)
  }
}