import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateItemInput } from "@src/catalog/user-catalog/shared/inputs/create-item.input"
import { FindAllItemsInput } from '@src/catalog/user-catalog/shared/inputs/find-all-items.input'
import { UpdateItemInput } from '@src/catalog/user-catalog/shared/inputs/update-item.input'
import { PaginatedItems } from '@src/catalog/user-catalog/shared/types/paginated-items.type'
import { userCatalogItemFields } from "@src/catalog/user-catalog/shared/utils/user-catalog-item-fields.util"
import { IDType } from '@src/common/enums/id-type.enum'
import { UserCatalogItem } from "@src/common/types/user-catalog-item.type"
import type { Nullable } from '@src/common/utils/nullable.util'
import { PrismaService } from "@src/infrastructure/prisma/prisma.service"
import { RedisService } from '@src/infrastructure/redis/redis.service'
import { S3Service } from '@src/infrastructure/s3/s3.service'
import { DataValidatorProvider } from '@src/validation/data/data-validator.provider'
import { FileUpload } from 'graphql-upload-ts'

@Injectable()
export class UserCatalogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly s3Service: S3Service,
    private readonly dataValidator: DataValidatorProvider
  ) {}

  public async findAll(userId: string, input: FindAllItemsInput): Promise<PaginatedItems> {
    if (!this.dataValidator.validateId(userId, IDType.UUID))
      throw new BadRequestException('Invalid ID format')

    const { page, pageSize } = input
    const skip = pageSize * (page - 1)

    const [ items, count ] = await Promise.all([
      this.prisma.item.findMany({
        where: {
          userId: userId
        },
        select: userCatalogItemFields,
        take: pageSize,
        skip: skip,
        orderBy: {
          name: 'asc'
        }
      }),
      this.prisma.item.count({
        where: {
          userId: userId
        }
      })
    ])

    const totalPages = Math.ceil(count / pageSize)
    const mappedItems = await Promise.all(
      items.map(async item => {
        const imageUrl = await this.s3Service.getImage(item.image)

        return {
          ...item,
          image: imageUrl
        }
      }))

    return {
      data: mappedItems,
      totalCount: count,
      totalPages: totalPages,
      hasNextPage: page < totalPages
    }
  }

  public async findById(userId: string, id: string): Promise<Nullable<UserCatalogItem>> {
    if (
      !this.dataValidator.validateId(id, IDType.UUID) ||
      !this.dataValidator.validateId(userId, IDType.UUID)
    )
      throw new BadRequestException('Invalid ID format')

    const cacheKey = `item-${userId}:${id}`
    const cachedItem = await this.redis.get<UserCatalogItem>(cacheKey)
    if (cachedItem) return cachedItem

    let item = await this.prisma.item.findUnique({
      where: {
        id: id,
        userId: userId
      },
      select: userCatalogItemFields
    })

    if (!item) return null
    const imageUrl = await this.s3Service.getImage(item.image)
    item = {
      ...item,
      image: imageUrl
    } as const

    await this.redis.set<UserCatalogItem>(cacheKey, item)

    return item
  }

  public async create(userId: string, input: CreateItemInput, image: FileUpload): Promise<UserCatalogItem> {
    if (!this.dataValidator.validateId(userId, IDType.UUID))
      throw new BadRequestException('Invalid users ID format')
    const { name, description } = input

    const imageKey = await this.s3Service.uploadImage(userId, image)

    const item = await this.prisma.item.create({
      data: {
        name: name,
        image: imageKey,
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

  public async update(userId: string, input: UpdateItemInput, image: FileUpload): Promise<UserCatalogItem> {
    if (
      !this.dataValidator.validateId(userId, IDType.UUID) ||
      !this.dataValidator.validateId(input.id, IDType.UUID)
    )
      throw new BadRequestException('Invalid ID format or input is empty')

    const { id, name, description } = input

    try {
      const item = await this.prisma.item.update({
        where: {
          id: id,
          userId: userId
        },
        data: {
          name: name ?? undefined,
          description: description
        },
        select: userCatalogItemFields
      })

      await this.s3Service.updateImage(item.image, image)

      return item
    } catch (error) {
      throw new NotFoundException(`Item with ID ${id} not found`)
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

      await this.s3Service.delete(item.image)

      const cacheKey = `item-${userId}:${id}`
      await this.redis.delete(cacheKey)

      return item
    } catch (error) {
      throw new NotFoundException(`Item with ID ${id} not found`)
    }
  }
}
