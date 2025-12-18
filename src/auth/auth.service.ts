import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";
import type { AuthorizeUserInput } from "@src/auth/inputs/authorize-user.input";
import type { RegisterUserInput } from "@src/auth/inputs/register-user.input";
import { User } from "@src/common/types/user.type"
import { PrismaService } from "@src/prisma/prisma.service";
import { genSalt, hash } from "bcrypt";


export type AuthUser = Omit<User, "password"> & { accessToken: string }
export type IdentifiedUser = User & { id: string }

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService) {
  }

  async identify(email: string): Promise<IdentifiedUser | null> {
    return await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        username: true,
        email: true,
        profileImage: true,
        password: true
      }
    }) as IdentifiedUser
  }

  async authenticate(user: User, email: string, hashedPassword: string): Promise<boolean> {
    return user.password === hashedPassword && user.email === email
  }

  async register(input: RegisterUserInput): Promise<boolean> {
    const { username, email, password } = input

    const salt = await genSalt(10)
    const hashed = await hash(password, salt)

    const user = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashed,
      }
    })

    return !!user
  }

  async authorize(input: AuthorizeUserInput): Promise<AuthUser> {
    const { email, password } = input

    const user = await this.identify(email)

    if (!user) throw new Error("User not found")

    const salt = await genSalt(10)
    const hashed = await hash(password, salt)
    const isAuthN = await this.authenticate(user, email, hashed)

    if (!isAuthN) throw new Error("Authentication failed")

    const accessToken = await this.jwtService.signAsync({
      sub: user.id
    })

    return {
      email: email,
      username: user.username,
      profileImage: user.profileImage,
      accessToken: accessToken,
    }
  }
}
