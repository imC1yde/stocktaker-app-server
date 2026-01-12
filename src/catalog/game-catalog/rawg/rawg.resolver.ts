import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GetAllInput } from '@src/catalog/game-catalog/rawg/inputs/getAll.input'
import { RawgService } from '@src/catalog/game-catalog/rawg/rawg.service'
import { mapRawgList } from '@src/catalog/game-catalog/shared/maps/rawg-list.map'
import { RawgGames } from '@src/catalog/game-catalog/shared/types/rawg-game.type'
import { IsAuthGuard } from '@src/common/guards/is-auth.guard'
import { firstValueFrom } from 'rxjs'


@UseGuards(IsAuthGuard)
@Resolver()
export class RawgResolver {
  constructor(private readonly rawgService: RawgService) {}

  @Mutation(() => [ RawgGames ])
  public async getPaginatedGames(@Args('input') input: GetAllInput): Promise<RawgGames[]> {
    const data = await firstValueFrom(this.rawgService.getAll(input))

    return mapRawgList(data.results)
  }
}