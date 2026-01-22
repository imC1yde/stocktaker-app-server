import { Configuration, Value } from '@itgorillaz/configify'
import { IsNotEmpty, IsString } from 'class-validator'

@Configuration()
export class RawgConfig {
  @Value('external.rawg.url')
  @IsString()
  @IsNotEmpty()
  public readonly url!: string

  @Value('external.rawg.key')
  @IsString()
  @IsNotEmpty()
  public readonly accessKey!: string
}
