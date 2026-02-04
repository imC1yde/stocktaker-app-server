import { HttpService } from '@nestjs/axios'
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { IRequestOptions } from '@src/infrastructure/integrations/rawg-api/interfaces/request-options.interface'
import { AxiosRequestConfig } from 'axios'
import { catchError, map, Observable, retry, timeout } from 'rxjs'

@Injectable()
export class RawgClient {

  constructor(
    private readonly httpService: HttpService
  ) {}

  public getData<TData>(url: string, requestConfig: AxiosRequestConfig, requestOptions?: IRequestOptions): Observable<TData> {
    if (!requestConfig.params.key) throw new BadRequestException('Key must be provided')

    return this.httpService
      .get(url, requestConfig)
      .pipe(
        timeout(requestOptions?.timeout || 1),
        retry(requestOptions?.retryConfig || {}),
        map((res) => res.data),
        catchError((err) => {
          const status = err.response?.status || err.status

          switch (status) {
            case 404:
              throw new NotFoundException('Content not found by URL')
            case 401:
              throw new UnauthorizedException('Not authorized')
            case 403:
              throw new ForbiddenException('Access is prohibited')
            default:
              throw new InternalServerErrorException('Server error')
          }
        })
      )
  }
}