import { Configuration, Value } from '@itgorillaz/configify'

@Configuration()
export class RawgConfig {
  @Value('external.rawg.url')
  public readonly url!: string

  @Value('external.rawg.key')
  public readonly accessKey!: string
}
