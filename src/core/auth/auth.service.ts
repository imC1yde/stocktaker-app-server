import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from "@nestjs/jwt"
import { User } from "@src/common/types/user.type"
import type { Nullable } from '@src/common/utils/nullable.util'
import { AuthorizeUserInput } from "@src/core/auth/shared/inputs/authorize-user.input"
import { RegisterUserInput } from "@src/core/auth/shared/inputs/register-user.input"
import { UserWithToken } from '@src/core/auth/shared/types/user-with-token.type'
import { mapAuthorizedUser } from '@src/core/shared/maps/authorized-user.map'
import { UserForAuth } from '@src/core/shared/types/user-for-auth.type'
import { UserService } from "@src/core/user/user.service"
import { hash, verify } from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  // check email and password with stored data
  private async authenticate(user: UserForAuth, password: string): Promise<boolean> {
    return await verify(user.password, password)
  }

  // takes input with optional username, email and password
  public async register(input: RegisterUserInput): Promise<Nullable<User>> {
    const { username, email, password } = input

    const hashed = await hash(password)

    try {
      const user = await this.userService.create({
        username,
        email,
        hashed
      })

      return user
    } catch (error) {
      throw new ConflictException('User already exists')
    }
  }

  // authorize users by email and password
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
