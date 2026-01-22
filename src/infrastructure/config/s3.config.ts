import { Configuration, Value } from '@itgorillaz/configify'

@Configuration()
export class S3Config {
  @Value('S3_BUCKET')
  public readonly bucket: string

  @Value('S3_REGION')
  public readonly region: string

  @Value('S3_ACCESS_KEY')
  public readonly accessKey: string

  @Value('S3_SECRET_KEY')
  public readonly secretKey: string
}