import { Module } from '@nestjs/common'
import { S3Client } from '@src/infrastructure/s3/s3.client'

@Module({
  providers: [
    S3Client
  ]
})
export class S3Module {}