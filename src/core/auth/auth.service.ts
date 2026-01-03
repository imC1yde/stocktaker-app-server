import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from "@nestjs/jwt"
import { User } from "@src/common/types/user.type"
import type { Nullable } from '@src/common/utils/nullable'
import { AuthorizeUserInput } from "@src/core/auth/inputs/authorize-user.input"
import { RegisterUserInput } from "@src/core/auth/inputs/register-user.input"
import { UserWithToken } from '@src/core/auth/types/user-with-token.type'
import { mapAuthorizedUser } from '@src/core/shared/maps/authorized-user.map'
import { UserForAuth } from '@src/core/shared/types/user-for-auth.type'
import { UserService } from "@src/core/user/user.service"
import { PrismaService } from '@src/infrastructure/prisma/prisma.service'
import { hash, verify } from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService) {}

  // check email and password with stored data
  private async authenticate(user: UserForAuth, password: string): Promise<boolean> {
    return await verify(user.password, password)
  }

  // takes input with optional username, email and password
  public async register(input: RegisterUserInput): Promise<Nullable<User>> {
    const { password } = input

    const hashed = await hash(password)

    const user = await this.userService.create({
      ...input,
      password: hashed
    })

    return user
  }

  // authorize user by email and password
  public async authorize(input: AuthorizeUserInput): Promise<Nullable<UserWithToken>> {
    const { email, password } = input

    const user = await this.userService.findForAuth(email)
    if (!user) throw new UnauthorizedException("Invalid email or password")

    const isAuthentified = await this.authenticate(user, password)
    if (!isAuthentified) throw new UnauthorizedException("Invalid email or password")

    const token = await this.jwtService.signAsync({
      sub: user.id
    })

    return mapAuthorizedUser(user, token)
  }
}
