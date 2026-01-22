import { Injectable } from '@nestjs/common'
import { GetRawgGamesInput } from '@src/catalog/game-catalog/rawg/inputs/get-rawg-games.input'
import { IRawgContent } from '@src/catalog/game-catalog/shared/interfaces/rawg-content.interface'
import { RawgConfig } from '@src/infrastructure/config/rawg-api.config'
import { RawgClient } from '@src/infrastructure/integrations/rawg-api/rawg.client'
import { lastValueFrom, timer } from 'rxjs'

@Injectable()
export class RawgDomainService {
  constructor(
    private readonly rawgClient: RawgClient,
    private readonly rawgConfig: RawgConfig
  ) {}

  public async getAll(input: GetRawgGamesInput): Promise<IRawgContent<any>> {
    const { search, page, pageSize } = input

    return await lastValueFrom(this.rawgClient.getData<IRawgContent<any>>(
      this.rawgConfig.url,
      {
        params: {
          key: this.rawgConfig.accessKey,
          search: search,
          page: page,
          pageSize: pageSize
        }
      },
      {
        timeout: 3000,
        retryConfig: {
          count: 3,
          delay: (_, count) => timer(1000 * count)
        }
      }
    ))
  }

  public async getById(id: number): Promise<any> {
    return await lastValueFrom(this.rawgClient.getData<any>(
      `${this.rawgConfig.url}/${id}`,
      {
        params: {
          key: this.rawgConfig.accessKey
        }
      },
      {
        timeout: 3000,
        retryConfig: {
          count: 3,
          delay: (_, count) => timer(1000 * count)
        }
      }
    ))
  }
}