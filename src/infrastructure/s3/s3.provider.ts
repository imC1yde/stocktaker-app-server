import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { S3Config } from '@src/infrastructure/config/s3.config'
import { Readable } from 'stream'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class S3Provider {
  private readonly region: string
  private readonly bucket: string
  private readonly client: S3Client

  constructor(
    private readonly s3Config: S3Config
  ) {
    this.region = this.s3Config.region
    this.bucket = this.s3Config.bucket

    this.client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.s3Config.accessKey,
        secretAccessKey: this.s3Config.secretKey
      }
    })
  }

  // @returns A unique filename key for stored file
  public async upload(userId: string, stream: Readable, filename: string): Promise<string> {
    const key = `${uuidv4()}-${Date.now()}`

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: stream,
      ContentType: 'image',
      Metadata: {
        userId: userId,
        originFilename: filename
      }
    })

    try {
      await this.client.send(command)

      return key
    } catch (error) {
      throw new BadRequestException(`File has not uploaded! ${error.message}`)
    }
  }

  // @returns A temporal url for file
  public async get(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key
    })

    const url = await getSignedUrl(
      this.client,
      command,
      { expiresIn: 3600 }
    )

    return url
  }

  public async update(stream: Readable, key: string): Promise<boolean> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: stream
    })

    try {
      await this.client.send(command)

      return true
    } catch (error) {
      throw new NotFoundException(`File has not found to update! ${error.message}`)
    }
  }
}