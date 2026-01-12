import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@src/common/decorators/current-user.decorator'
import { IsAuthGuard } from '@src/common/guards/is-auth.guard'
import type { IUserPayload } from '@src/common/interfaces/user-payload.interface'
import { User } from '@src/common/types/user.type'
import { UpdateUserInput } from '@src/core/user/inputs/update-user.input'
import { UserService } from './user.service';

@UseGuards(IsAuthGuard)
@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User, { name: 'updateUser' })
  public async updateUser(@CurrentUser() user: IUserPayload,
                          @Args('input') input: UpdateUserInput
  ): Promise<User> {
    return await this.userService.update(user.sub, input)
  }

  @Mutation(() => User, { name: 'deleteUser' })
  public async deleteUser(@CurrentUser() user: IUserPayload): Promise<User> {
    return await this.userService.delete(user.sub)
  }
}
