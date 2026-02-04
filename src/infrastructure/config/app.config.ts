import { Configuration, Value } from '@itgorillaz/configify'
import { Transform } from 'class-transformer'

@Configuration()
export class AppConfig {
  @Transform(({ value }) => Number(value))
  @Value('NEST_PORT')
  public readonly port!: number

  @Value('VITE_ORIGIN_URL')
  public readonly originUrl!: string
}

