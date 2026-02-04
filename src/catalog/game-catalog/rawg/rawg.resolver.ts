import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GetRawgGamesInput } from '@src/catalog/game-catalog/rawg/inputs/get-rawg-games.input'
import { RawgService } from '@src/catalog/game-catalog/rawg/rawg.service'
import { mapRawgList } from '@src/catalog/game-catalog/shared/maps/rawg-list.map'
import { RawgGame } from '@src/catalog/game-catalog/shared/types/rawg-game.type'
import { AuthGuard } from '@src/common/guards/auth.guard'
import { firstValueFrom } from 'rxjs'


@UseGuards(AuthGuard)
@Resolver()
export class RawgResolver {
  constructor(private readonly rawgService: RawgService) {}

  @Mutation(() => [ RawgGame ], { name: 'getRawgGames' })
  public async getRawgGames(@Args('input') input: GetRawgGamesInput): Promise<RawgGame[]> {
    const data = await firstValueFrom(this.rawgService.getAll(input))

    return mapRawgList(data.results)
  }
}