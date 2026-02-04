import { Configuration, Value } from '@itgorillaz/configify'

@Configuration()
export class RedisConfig {
  @Value('REDIS_PORT')
  public readonly host: any

  @Value('REDIS_HOST')
  public readonly port: any

  @Value('REDIS_PASSWORD')
  public readonly password: any
}