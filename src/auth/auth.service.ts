import { Injectable } from '@nestjs/common';
import { Args, Mutation, Query } from "@nestjs/graphql";
import type { LoginUserInput } from "@src/auth/inputs/login-user.input";
import type { RegisterUserInput } from "@src/auth/inputs/register-user.input";
import { User } from "@src/common/types/user.type";
import { PrismaService } from "@src/prisma/prisma.service";
import { genSalt, hash } from "bcrypt";

// todo:
// [] - create jwt config
// [] - register user
// [] - login user
// [?] - logout user

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {
  }

  @Mutation(() => User, { name: "registerUser" })
  async register(@Args("data") data: RegisterUserInput): Promise<User> {
    const { username, email, password } = data

    const salt = await genSalt(10)
    const hashed = await hash(password, salt)

    const user = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashed,
      }
    })

    return user
  }

  @Query(() => User, { name: "loginUser" })
  async login(@Args("data") data: LoginUserInput): Promise<User> {

    return new User()
  }
}
