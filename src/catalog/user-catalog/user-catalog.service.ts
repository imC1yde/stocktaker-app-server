import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ICatalogService } from "@src/catalog/factories/catalog-factory.interfaces"
import { CreateItemInput } from "@src/catalog/user-catalog/inputs/create-item.input"
import { FindAllItemsInput } from '@src/catalog/user-catalog/inputs/find-all-items.input'
import { UpdateItemInput } from '@src/catalog/user-catalog/inputs/update-item.input'
import { userCatalogItemFields } from "@src/catalog/user-catalog/utils/user-catalog-item-fields.util"
import { UserCatalogItem } from "@src/common/types/user-catalog-item.type"
import { checkForAnyValue } from '@src/common/utils/any-value-checking.util'
import type { Nullable } from '@src/common/utils/nullable.util'
import { PrismaService } from "@src/infrastructure/prisma/prisma.service"
import { isUUID } from 'class-validator'

@Injectable()
export class UserCatalogService implements ICatalogService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  public async findAll(id: string, input: FindAllItemsInput): Promise<UserCatalogItem[]> {
    if (!isUUID(id))
      throw new BadRequestException('ID невалиден')

    const { page, pageSize } = input
    const skip = pageSize * (page - 1)

    const items = await this.prisma.item.findMany({
      where: { userId: id },
      select: userCatalogItemFields,
      take: pageSize,
      skip: skip,
      orderBy: {
        name: 'asc'
      }
    })

    return items
  }

  public async findById(id: string): Promise<Nullable<UserCatalogItem>> {
    if (!isUUID(id))
      throw new BadRequestException('ID невалиден')

    const item = await this.prisma.item.findUnique({
      where: { id: id },
      select: userCatalogItemFields
    })

    return item
  }

  public async create(userId: string, input: CreateItemInput): Promise<UserCatalogItem> {
    if (!isUUID(userId))
      throw new BadRequestException('ID пользователя невалиден')
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

  public async update(id: string, input: UpdateItemInput): Promise<UserCatalogItem> {
    if (!checkForAnyValue<UpdateItemInput>(input) || !isUUID(id))
      throw new BadRequestException('Хотя бы одно из полей должно быть заполнено')
    const { name, image, description } = input

    try {
      const item = await this.prisma.item.update({
        where: {
          id: id
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
      throw new Error(`Предмет в инвенторе с ID ${id} не был найден`)
    }
  }

  public async delete(id: string): Promise<UserCatalogItem> {
    if (!isUUID(id))
      throw new BadRequestException('ID невалиден')

    try {
      const item = await this.prisma.item.delete({
        where: {
          id: id
        },
        select: userCatalogItemFields
      })

      return item
    } catch (error) {
      throw new NotFoundException(`Предмет с ID ${id} не найден`)
    }
  }
}
