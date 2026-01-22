import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateItemInput } from '@src/catalog/user-catalog/inputs/create-item.input'
import { FindAllItemsInput } from '@src/catalog/user-catalog/inputs/find-all-items.input'
import { UpdateItemInput } from '@src/catalog/user-catalog/inputs/update-item.input'
import { UserCatalogService } from '@src/catalog/user-catalog/user-catalog.service'
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { AuthGuard } from "@src/common/guards/auth.guard"
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { UserCatalogItem } from "@src/common/types/user-catalog-item.type"
import type { Nullable } from '@src/common/utils/nullable.util'

@Resolver()
export class UserCatalogResolver {
  constructor(private readonly userCatalogService: UserCatalogService) {}

  @Query(() => [ UserCatalogItem ], { name: 'getAllUserItems' })
  public async findAll(
    @CurrentUser() user: IUserPayload,
    @Args('filter', { nullable: true }) input: FindAllItemsInput
  ): Promise<UserCatalogItem[]> {
    return await this.userCatalogService.findAll(user.sub, input)
  }

  @Query(() => UserCatalogItem, { name: 'getItemById' })
  public async findById(
    @CurrentUser() user: IUserPayload,
    @Args('id') id: string
  ): Promise<Nullable<UserCatalogItem>> {
    return await this.userCatalogService.findById(user.sub, id)
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserCatalogItem, { name: 'createUserItem' })
  public async create(
    @CurrentUser() user: IUserPayload,
    @Args('input') input: CreateItemInput
  ): Promise<UserCatalogItem> {
    return await this.userCatalogService.create(user.sub, input)
  }

  @Mutation(() => UserCatalogItem, { name: 'updateUserItem' })
  public async update(
    @CurrentUser() user: IUserPayload,
    @Args('id') id: string,
    @Args('input') input: UpdateItemInput
  ): Promise<UserCatalogItem> {
    return await this.userCatalogService.update(user.sub, id, input)
  }

  @Mutation(() => UserCatalogItem, { name: 'deleteUserItem' })
  public async delete(
    @CurrentUser() user: IUserPayload,
    @Args('id') id: string
  ): Promise<UserCatalogItem> {
    return await this.userCatalogService.delete(user.sub, id)
  }
}
