import { Configuration, Value } from '@itgorillaz/configify'
import { NodeEnv } from '@src/infrastructure/config/enums/node-env.enum'
import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty } from 'class-validator'

@Configuration()
export class AppConfig {
  @Transform(({ value }) => Number(value))
  @Value('NEST_PORT')
  public readonly port!: number

  @Value('NODE_ENV')
  @IsEnum(NodeEnv)
  @IsNotEmpty()
  public readonly nodeEnv!: NodeEnv
}

