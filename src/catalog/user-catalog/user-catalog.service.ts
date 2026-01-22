import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ICatalogService } from '@src/catalog/interfaces/catalog-service.interface'
import { CreateItemInput } from "@src/catalog/user-catalog/inputs/create-item.input"
import { FindAllItemsInput } from '@src/catalog/user-catalog/inputs/find-all-items.input'
import { UpdateItemInput } from '@src/catalog/user-catalog/inputs/update-item.input'
import { userCatalogItemFields } from "@src/catalog/user-catalog/utils/user-catalog-item-fields.util"
import { IDType } from '@src/common/enums/id-type.enum'
import { UserCatalogItem } from "@src/common/types/user-catalog-item.type"
import type { Nullable } from '@src/common/utils/nullable.util'
import { PrismaService } from "@src/infrastructure/prisma/prisma.service"
import { DataValidatorProvider } from '@src/validator/data/data-validator.provider'

@Injectable()
export class UserCatalogService implements ICatalogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dataValidator: DataValidatorProvider
  ) {}

  public async findAll(userId: string, input: FindAllItemsInput): Promise<UserCatalogItem[]> {
    if (!this.dataValidator.validateId(userId, IDType.UUID))
      throw new BadRequestException('Invalid ID format')

    const { page, pageSize } = input
    const skip = pageSize * (page - 1)

    const items = await this.prisma.item.findMany({
      where: {
        userId: userId
      },
      select: userCatalogItemFields,
      take: pageSize,
      skip: skip,
      orderBy: {
        name: 'asc'
      }
    })

    return items
  }

  public async findById(userId: string, id: string): Promise<Nullable<UserCatalogItem>> {
    if (
      !this.dataValidator.validateId(id, IDType.UUID) ||
      !this.dataValidator.validateId(userId, IDType.UUID)
    )
      throw new BadRequestException('Invalid ID format')

    const item = await this.prisma.item.findUnique({
      where: {
        id: id,
        userId: userId
      },
      select: userCatalogItemFields
    })

    return item
  }

  public async create(userId: string, input: CreateItemInput): Promise<UserCatalogItem> {
    if (!this.dataValidator.validateId(userId, IDType.UUID))
      throw new BadRequestException('Invalid user ID format')
    const { name, image, description } = input;

    const item = await this.prisma.item.create({
      data: {
        name,
        image,
        description: description,
        user: {
          connect: {
            id: userId
          }
        }
      },
      select: userCatalogItemFields
    })

    return item
  }

  public async update(userId: string, id: string, input: UpdateItemInput): Promise<UserCatalogItem> {
    if (
      !this.dataValidator.checkForAnyValue<UpdateItemInput>(input) ||
      !this.dataValidator.validateId(userId, IDType.UUID) ||
      !this.dataValidator.validateId(id, IDType.UUID)
    )
      throw new BadRequestException('Invalid ID format or input is empty')
    const { name, image, description } = input

    try {
      const item = await this.prisma.item.update({
        where: {
          id: id,
          userId: userId
        },
        data: {
          name: name ?? undefined,
          image: image ?? undefined,
          description: description
        },
        select: userCatalogItemFields
      })

      return item
    } catch (error) {
      throw new Error(`Item with ID ${id} not found`)
    }
  }

  public async delete(userId: string, id: string): Promise<UserCatalogItem> {
    if (
      !this.dataValidator.validateId(id, IDType.UUID) ||
      !this.dataValidator.validateId(userId, IDType.UUID)
    )
      throw new BadRequestException('Invalid ID format')

    try {
      const item = await this.prisma.item.delete({
        where: {
          id: id,
          userId: userId
        },
        select: userCatalogItemFields
      })

      return item
    } catch (error) {
      throw new NotFoundException(`Item with ID ${id} not found`)
    }
  }
}
