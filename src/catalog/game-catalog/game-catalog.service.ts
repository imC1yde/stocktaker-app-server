import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateGameInput } from '@src/catalog/game-catalog/inputs/create-game.input'
import { FindAllGamesFilterInput } from '@src/catalog/game-catalog/inputs/find-all-games.filter.input'
import { FindAllGamesInput } from '@src/catalog/game-catalog/inputs/find-all-games.input'
import { UpdateGameInput } from '@src/catalog/game-catalog/inputs/update-game.input'
import { mapGame } from '@src/catalog/game-catalog/shared/maps/game.map'
import { mapGamesList } from '@src/catalog/game-catalog/shared/maps/games-list.map'
import { ListedGame } from '@src/catalog/game-catalog/shared/types/listed-game.type'
import { ICatalogService } from '@src/catalog/interfaces/catalog-service.interface'
import { IDType } from '@src/common/enums/id-type.enum'
import { Game } from '@src/common/types/game.type'
import type { Nullable } from '@src/common/utils/nullable.util'
import { PrismaService } from '@src/infrastructure/prisma/prisma.service'
import { DataValidatorProvider } from '@src/validator/data/data-validator.provider'
import { GameValidatorProvider } from '@src/validator/game/game-validator.provider'

@Injectable()
export class GameCatalogService implements ICatalogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dataValidator: DataValidatorProvider,
    private readonly gameValidator: GameValidatorProvider
  ) {}

  public async create(userId: string, input: CreateGameInput): Promise<Game> {
    if (!this.dataValidator.validateId(userId, IDType.UUID))
      throw new BadRequestException('Invalid user ID format')

    const platforms = this.dataValidator.sanitizeArray(input.platforms)
    const genres = this.dataValidator.sanitizeArray(input.genres)
    const released = input.released ? input.released + 'T00:00:00.000Z' : null
    const esrbRating = this.gameValidator.parseEsrbRating(input.esrbRating)

    const game = await this.prisma.game.upsert({
      where: {
        rawgId: input.rawgId
      },
      update: {},
      create: {
        rawgId: input.rawgId,
        name: input.name,
        slug: input.slug,
        description: input.description ?? null,
        backgroundImage: input.backgroundImage ?? null,
        rating: input.rating,
        released: released,
        esrbRating: esrbRating,
        platforms: platforms,
        genres: genres
      }
    })

    const inventory = await this.prisma.gameInventory.upsert({
      where: {
        gameId_userId: {
          userId: userId,
          gameId: game.id
        }
      },
      update: {},
      create: {
        userId: userId,
        gameId: game.id,
        isCompleted: false
      },
      select: {
        isCompleted: true
      }
    })

    console.log(game.id)

    return mapGame({
      data: game,
      isCompleted: inventory.isCompleted
    })
  }

  public async findAll(userId: string, input: FindAllGamesInput, filter?: FindAllGamesFilterInput): Promise<ListedGame[]> {
    if (!this.dataValidator.validateId(userId, IDType.UUID))
      throw new BadRequestException('Invalid user ID format')

    const { page, pageSize } = input
    const skip = pageSize * (page - 1)

    const inventory = await this.prisma.gameInventory.findMany({
      where: {
        userId: userId,
        game: {
          slug: filter?.name ? { contains: filter.name, mode: 'insensitive' } : undefined,
          rating: filter?.rating ? { gte: filter.rating } : undefined,
          esrbRating: filter?.esrbRating ? { equals: filter.esrbRating } : undefined,
          genres: filter?.genres?.length ? { hasSome: filter.genres } : undefined,
          platforms: filter?.platforms?.length ? { hasSome: filter.platforms } : undefined
        }
      },
      include: {
        game: true
      },
      take: pageSize,
      skip: skip,
      orderBy: {
        game: {
          name: 'asc'
        }
      }
    })

    return mapGamesList(inventory)
  }

  public async findById(userId: string, id: string): Promise<Nullable<Game>> {
    if (
      !this.dataValidator.validateId(userId, IDType.UUID) ||
      !this.dataValidator.validateId(id, IDType.UUID)
    )
      throw new BadRequestException('Invalid user or inventory ID format')

    const inventory = await this.prisma.gameInventory.findUnique({
      where: {
        gameId_userId: {
          gameId: id,
          userId: userId
        }
      },
      include: {
        game: true
      }
    })

    if (!inventory) throw new NotFoundException('Game not found')

    return mapGame({
      data: inventory.game,
      isCompleted: inventory.isCompleted
    })
  }

  public async update(userId: string, id: string, input: UpdateGameInput): Promise<Game> {
    if (
      !this.dataValidator.validateId(userId, IDType.UUID) ||
      !this.dataValidator.validateId(id, IDType.UUID)
    )
      throw new BadRequestException('Invalid user or inventory ID format')

    try {
      const inventory = await this.prisma.gameInventory.update({
        where: {
          gameId_userId: {
            gameId: id,
            userId: userId
          }
        },
        data: {
          isCompleted: input.isCompleted
        },
        include: {
          game: true
        }
      })

      return mapGame({
        data: inventory.game,
        isCompleted: inventory.isCompleted
      })
    } catch (error) {
      throw new InternalServerErrorException(`Game updating failed. ${error}`)
    }
  }

  public async delete(userId: string, id: string): Promise<Game> {
    if (
      !this.dataValidator.validateId(userId, IDType.UUID) ||
      !this.dataValidator.validateId(id, IDType.UUID)
    )
      throw new BadRequestException('Invalid user or inventory ID format')

    try {
      const inventory = await this.prisma.gameInventory.delete({
        where: {
          gameId_userId: {
            gameId: id,
            userId: userId
          }
        },
        include: {
          game: true
        }
      })

      return mapGame({
        data: inventory.game,
        isCompleted: inventory.isCompleted
      })
    } catch (error) {
      throw new InternalServerErrorException(`Game deleting failed. ${error}`)
    }
  }
}