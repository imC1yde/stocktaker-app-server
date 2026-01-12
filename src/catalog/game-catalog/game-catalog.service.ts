import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { ObjectType, OmitType } from '@nestjs/graphql'
import { CreateGameInput } from '@src/catalog/game-catalog/inputs/create-game.input'
import type { FindAllGamesInput } from '@src/catalog/game-catalog/inputs/find-all-games.input'
import { mapGame } from '@src/catalog/game-catalog/shared/maps/game.map'
import { mapGamesList } from '@src/catalog/game-catalog/shared/maps/games-list.map'
import { Game } from '@src/common/types/game.type'
import type { Nullable } from '@src/common/utils/nullable.util'
import { PrismaService } from '@src/infrastructure/prisma/prisma.service'
import type { DataValidatorProvider } from '@src/validator/data/data-validator.provider'

// ./shared/types/listed-game.type.ts
@ObjectType()
export class ListedGame extends OmitType(Game,
  [
    'description',
    'rating',
    'released',
    'esrbRating',
    'genres',
    'platforms'
  ]) {}

@Injectable()
export class GameCatalogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly dataValidator: DataValidatorProvider
  ) {}

  public async create(userId: string, input: CreateGameInput): Promise<Game> {
    const game = await this.prisma.game.upsert({
      where: {
        rawgId: input.rawgId
      },
      update: {},
      create: {
        rawgId: input.rawgId,
        name: input.name,
        slug: input.slug,
        description: input.description,
        backgroundImage: input.backgroundImage,
        rating: input.rating,
        released: input.released,
        esrbRating: input.esrbRating,
        platforms: input.platforms,
        genres: input.genres
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

    return mapGame({
      data: game,
      isCompleted: inventory.isCompleted
    })
  }

  public async findAll(id: string, input: FindAllGamesInput): Promise<ListedGame[]> {
    const { page, pageSize } = input
    const skip = pageSize * (page - 1)

    const inventory = await this.prisma.gameInventory.findMany({
      where: {
        userId: id
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

    if (!inventory) throw new NotFoundException('Игры не найдено')

    return mapGame({
      data: inventory.game,
      isCompleted: inventory.isCompleted
    })
  }

  public async update(userId: string, id: string): Promise<Game> {
    const game = await this.prisma.gameInventory.findUnique({
      where: {
        gameId_userId: {
          gameId: id,
          userId: userId
        }
      }
    })

    if (!game) throw new NotFoundException('Игра в вашем инвенторе не найдена')

    try {
      const inventory = await this.prisma.gameInventory.update({
        where: {
          gameId_userId: {
            gameId: id,
            userId: userId
          }
        },
        data: {
          isCompleted: !game.isCompleted
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
      throw new InternalServerErrorException(`Обновление игры не удалось. ${error}`)
    }
  }

  public async delete(userId: string, id: string): Promise<Game> {
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
      throw new ConflictException(`Удаление игры не удалось. ${error}`)
    }
  }
}