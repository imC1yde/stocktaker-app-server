import { BadRequestException, Injectable } from '@nestjs/common'
import { S3Provider } from '@src/infrastructure/s3/s3.provider'
import { DataValidatorProvider } from '@src/validation/data/data-validator.provider'
import { FileUpload } from 'graphql-upload-ts'
import { Readable } from 'stream'

@Injectable()
export class S3Service {
  constructor(
    private readonly s3: S3Provider,
    private readonly dataValidator: DataValidatorProvider
  ) {}

  public async uploadImage(userId: string, file: FileUpload): Promise<string> {
    const { createReadStream, filename, mimetype } = file
    const stream: Readable = createReadStream()

    if (!this.dataValidator.validateFile(mimetype, 'image'))
      throw new BadRequestException('Invalid file mimetype!')

    const key = await this.s3.upload(userId, stream, filename)

    return key
  }

  public async getImage(key: string): Promise<string> {
    const url = await this.s3.get(key)

    return url
  }

  public async updateImage(key: string, file: FileUpload): Promise<boolean> {
    const { createReadStream, mimetype } = file
    const stream: Readable = createReadStream()

    if (!this.dataValidator.validateFile(mimetype, 'image'))
      throw new BadRequestException('Invalid file mimetype!')

    return await this.s3.update(stream, key)
  }

  public async delete(key: string): Promise<boolean> {
    return await this.s3.delete(key)
  }
}