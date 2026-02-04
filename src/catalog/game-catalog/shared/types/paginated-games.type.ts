import { ObjectType } from '@nestjs/graphql'
import { GameListResponse } from '@src/catalog/game-catalog/shared/types/game-list-response.type'
import { Paginated } from '@src/common/strategies/paginated.strategy'

@ObjectType()
export class PaginatedGames extends Paginated(GameListResponse) {}