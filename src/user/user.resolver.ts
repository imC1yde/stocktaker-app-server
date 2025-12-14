// import { Resolver } from '@nestjs/graphql';
import { UserService } from '@src/user/user.service';

// @Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
