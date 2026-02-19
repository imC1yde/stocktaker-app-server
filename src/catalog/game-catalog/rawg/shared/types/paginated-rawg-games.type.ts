import { ObjectType } from '@nestjs/graphql'
import { RawgGame } from '@src/catalog/game-catalog/shared/types/rawg-game.type'
import { Paginated } from '@src/common/strategies/paginated.strategy'

@ObjectType()
export class PaginatedRawgGames extends Paginated(RawgGame) {}