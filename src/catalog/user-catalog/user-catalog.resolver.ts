import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ICatalogResolver } from "@src/catalog/factories/catalog-factory.interfaces"
import { CreateItemInput } from '@src/catalog/user-catalog/inputs/create-item.input'
import { UpdateItemInput } from '@src/catalog/user-catalog/inputs/update-item.input'
import { UserCatalogService } from '@src/catalog/user-catalog/user-catalog.service'
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { IsAuthGuard } from "@src/common/guards/is-auth.guard"
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { UserCatalogItem } from "@src/common/types/user-catalog-item.type"
import type { Nullable } from '@src/common/utils/nullable.util'

@UseGuards(IsAuthGuard)
@Resolver()
export class UserCatalogResolver implements ICatalogResolver {
  constructor(private readonly userCatalogService: UserCatalogService) {}

  @Query(() => [ UserCatalogItem ], { name: 'getAllUserItems' })
  public async getAllUserItems(@CurrentUser() user: IUserPayload): Promise<UserCatalogItem[]> {
    return await this.userCatalogService.findAll(user.sub)
  }

  @Query(() => UserCatalogItem, { name: 'getItemById' })
  public async getItemById(@Args('id') id: string): Promise<Nullable<UserCatalogItem>> {
    return await this.userCatalogService.findById(id)
  }

  @Mutation(() => UserCatalogItem, { name: 'createUserItem' })
  public async createUserItem(@CurrentUser() user: IUserPayload,
                              @Args('input') input: CreateItemInput
  ): Promise<UserCatalogItem> {
    return await this.userCatalogService.create(user.sub, input)
  }

  @Mutation(() => UserCatalogItem, { name: 'updateUserItem' })
  public async updateUserItem(@Args('id') id: string,
                              @Args('input') input: UpdateItemInput
  ): Promise<UserCatalogItem> {
    return await this.userCatalogService.update(id, input)
  }

  @Mutation(() => UserCatalogItem, { name: 'deleteUserItem' })
  public async deleteUserItem(@Args('id') id: string): Promise<UserCatalogItem> {
    return await this.userCatalogService.delete(id)
  }
}
