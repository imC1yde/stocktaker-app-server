import { Injectable } from '@nestjs/common'
import { S3Config } from '@src/infrastructure/config/s3.config'

@Injectable()
export class S3Client {
  private readonly bucket: string

  constructor(
    private readonly s3Config: S3Config
  ) {
    this.bucket = s3Config.bucket
  }
}