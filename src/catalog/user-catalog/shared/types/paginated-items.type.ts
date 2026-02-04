import { ObjectType } from '@nestjs/graphql'
import { Paginated } from '@src/common/strategies/paginated.strategy'
import { UserCatalogItem } from '@src/common/types/user-catalog-item.type'

@ObjectType()
export class PaginatedItems extends Paginated(UserCatalogItem) {}