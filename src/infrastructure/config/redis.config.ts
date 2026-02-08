import { Configuration, Value } from '@itgorillaz/configify'

@Configuration()
export class RedisConfig {
  @Value('REDIS_HOST')
  public readonly host: any

  @Value('REDIS_PORT')
  public readonly port: any

  @Value('REDIS_PASSWORD')
  public readonly password: any
}