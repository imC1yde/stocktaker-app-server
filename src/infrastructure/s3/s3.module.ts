import { Module } from '@nestjs/common'
import { S3Provider } from '@src/infrastructure/s3/s3.provider'
import { S3Service } from '@src/infrastructure/s3/s3.service'

@Module({
  providers: [
    S3Provider,
    S3Service
  ],
  exports: [
    S3Service
  ]
})
export class S3Module {}