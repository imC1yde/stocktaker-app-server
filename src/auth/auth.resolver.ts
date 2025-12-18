import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthorizeUserInput } from "@src/auth/inputs/authorize-user.input";
import { RegisterUserInput } from "@src/auth/inputs/register-user.input";
import { User } from "@src/common/types/user.type";
import { AuthService } from './auth.service';


@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => Boolean, { name: "registerUser" })
  async registerUser(@Args("registerUserInput", { type: () => RegisterUserInput }) input: RegisterUserInput) {
    return await this.authService.register(input)
  }

  @Query(() => User, { name: "authorizeUser" })
  async authorizeUser(@Args("authorizeUser", { type: () => AuthorizeUserInput }) input: AuthorizeUserInput) {
    return await this.authService.authorize(input)
  }
}
