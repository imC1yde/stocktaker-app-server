import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { IDType } from '@src/common/enums/id-type.enum'
import { User } from "@src/common/types/user.type"
import type { Nullable } from '@src/common/utils/nullable.util'
import { UserForAuth } from '@src/core/shared/types/user-for-auth.type'
import { CreateUserInput } from '@src/core/user/inputs/create-user.input'
import { UpdateUserInput } from '@src/core/user/inputs/update-user.input'
import { userFields } from '@src/core/user/utils/user-fields.util'
import { PrismaService } from "@src/infrastructure/prisma/prisma.service"
import { DataValidatorProvider } from '@src/validator/data/data-validator.provider'
import { UserValidatorProvider } from '@src/validator/user/user-validator.provider'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userValidator: UserValidatorProvider,
    private readonly dataValidator: DataValidatorProvider
  ) {}

  public async findByEmail(email: string): Promise<Nullable<User>> {
    if (!this.userValidator.validateUserEmail(email)) throw new BadRequestException('Invalid email format')

    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      },
      select: userFields
    })

    return user
  }

  public async findForAuth(email: string): Promise<Nullable<UserForAuth>> {
    if (!this.userValidator.validateUserEmail(email)) throw new BadRequestException('Invalid email format')

    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        ...userFields,
        password: true
      }
    })

    return user
  }

  public async create(input: CreateUserInput): Promise<User> {
    const { username, email, hashed } = input

    const user = await this.prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashed
      },
      select: userFields
    })

    return user
  }

  // updates only username and profile image \
  // email cannot be changed after registration
  public async update(id: string, input: UpdateUserInput): Promise<User> {
    if (!this.dataValidator.validateId(id, IDType.UUID)) throw new BadRequestException(`Invalid ID format`)

    const { username, profileImage } = input

    try {
      const user = await this.prisma.user.update({
        where: {
          id: id
        },
        data: {
          username: username,
          profileImage: profileImage
        },
        select: userFields
      })

      return user
    } catch (error) {
      throw new NotFoundException(`User not found`)
    }
  }

  public async delete(id: string): Promise<User> {
    if (!this.dataValidator.validateId(id, IDType.UUID)) throw new BadRequestException(`Invalid Id format`)

    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id
        },
        select: userFields
      })

      return user
    } catch (error) {
      throw new NotFoundException(`User not found`)
    }
  }
}
