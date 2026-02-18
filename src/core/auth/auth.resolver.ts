import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { User } from "@src/common/types/user.type"
import type { Nullable } from '@src/common/utils/nullable.util'
import { AuthService } from '@src/core/auth/auth.service'
import { AuthorizeUserInput } from "@src/core/auth/shared/inputs/authorize-user.input"
import { RegisterUserInput } from "@src/core/auth/shared/inputs/register-user.input"
import { UserWithToken } from '@src/core/auth/shared/types/user-with-token.type'


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: "registerUser", nullable: true })
  public async registerUser(@Args("input") input: RegisterUserInput):
    Promise<Nullable<User>> {
    return await this.authService.register(input)
  }

  @Mutation(() => UserWithToken, { name: "authorizeUser" })
  public async authorizeUser(@Args("input") input: AuthorizeUserInput):
    Promise<Nullable<User>> {
    console.log(input)
    return await this.authService.authorize(input)
  }
}
