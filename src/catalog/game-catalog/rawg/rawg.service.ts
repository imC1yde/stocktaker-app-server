import { HttpService } from '@nestjs/axios'
import { Injectable, NotFoundException } from '@nestjs/common'
import { GetRawgGamesInput } from '@src/catalog/game-catalog/rawg/inputs/get-rawg-games.input'
import { RawgConfig } from '@src/infrastructure/config/rawg-api.config'
import { catchError, map, Observable } from 'rxjs'

export interface IRawgContent<T> {
  count: number
  next: string
  previous: string
  results: T
}

@Injectable()
export class RawgService {
  constructor(
    private readonly httpService: HttpService,
    private readonly rawgConfig: RawgConfig
  ) {}

  public getAll(input: GetRawgGamesInput): Observable<IRawgContent<any>> {
    const { search, page, pageSize } = input

    return this.httpService
      .get(
        this.rawgConfig.url,
        {
          params: {
            key: this.rawgConfig.accessKey,
            search: search,
            page: page,
            pageSize: pageSize
          }
        }
      )
      .pipe(
        map(res => res.data),
        catchError(error => {
          throw new NotFoundException(error)
        })
      )
  }

  public getById(id: number): Observable<IRawgContent<any>> {
    return this.httpService
      .get(
        `${this.rawgConfig.url}/${id}`,
        {
          params: {
            key: this.rawgConfig.accessKey
          }
        }
      )
      .pipe(
        map(res => res.data),
        catchError(error => {
          throw new NotFoundException(error)
        })
      )
  }
}