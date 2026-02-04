import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Inject, Injectable } from '@nestjs/common'
import type { Nullable } from '@src/common/utils/nullable.util'
import { type Cache } from 'cache-manager'

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache
  ) {}

  public async get<TData>(key: string): Promise<Nullable<TData>> {
    return await this.cache.get(key) as TData
  }

  public async set<TData>(key: string, value: TData, ttl: number = 3_600_000): Promise<void> {
    await this.cache.set<TData>(key, value, ttl)
  }

  public async delete(key: string): Promise<void> {
    await this.cache.del(key)
  }
}