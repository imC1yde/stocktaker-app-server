import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GetRawgGamesInput } from '@src/catalog/game-catalog/rawg/inputs/get-rawg-games.input'
import { RawgDomainService } from '@src/catalog/game-catalog/rawg/rawg-domain.service'
import { mapRawgList } from '@src/catalog/game-catalog/shared/maps/rawg-list.map'
import { RawgGame } from '@src/catalog/game-catalog/shared/types/rawg-game.type'
import { AuthGuard } from '@src/common/guards/auth.guard'


@UseGuards(AuthGuard)
@Resolver()
export class RawgDomainResolver {
  constructor(private readonly rawgService: RawgDomainService) {}

  @Mutation(() => [ RawgGame ], { name: 'getRawgGames' })
  public async getRawgGames(@Args('input') input: GetRawgGamesInput): Promise<RawgGame[]> {
    const data = await this.rawgService.getAll(input)

    return mapRawgList(data.results)
  }
}