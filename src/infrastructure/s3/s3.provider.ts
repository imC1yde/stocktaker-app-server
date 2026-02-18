import {
  CreateBucketCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  PutBucketPolicyCommand,
  S3Client
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { BadRequestException, GoneException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { S3Config } from '@src/infrastructure/config/s3.config'
import { ReadStream } from 'graphql-upload-ts'
import { v4 as uuidV4 } from 'uuid'

@Injectable()
export class S3Provider implements OnModuleInit {
  private readonly bucket: string
  private readonly client: S3Client

  constructor(
    private readonly s3Config: S3Config
  ) {
    this.bucket = this.s3Config.bucket

    this.client = new S3Client({
      region: this.s3Config.region,
      endpoint: this.s3Config.endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId: this.s3Config.accessKey,
        secretAccessKey: this.s3Config.secretKey
      }
    })
  }

  // @Use Only for module initialization
  public async onModuleInit(): Promise<void> {
    await this.createBucket(this.bucket)

    await this.setPolicy()
  }

  // @returns A unique filename key for stored file
  public async upload(userId: string, stream: ReadStream, filename: string): Promise<string> {
    const key = `${uuidV4()}-${Date.now()}`

    const process = new Upload({
      client: this.client,
      params: {
        Bucket: this.bucket,
        Key: key,
        Body: stream,
        ContentType: 'image',
        Metadata: {
          userId: userId,
          originFilename: filename
        }
      },
      queueSize: 5,
      partSize: 5 * 1024 * 1024,
      leavePartsOnError: false
    })

    try {
      await process.done()

      return key
    } catch (error) {
      throw new BadRequestException(`[Error]:[S3] File has not uploaded! ${error.message}`)
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

  // Update file by key
  // @returns True if updated successfully
  public async update(stream: ReadStream, key: string): Promise<boolean> {
    const process = new Upload({
      client: this.client,
      params: {
        Bucket: this.bucket,
        Key: key,
        Body: stream,
        ContentType: 'image'
      },
      queueSize: 5,
      partSize: 5 * 1024 * 1024,
      leavePartsOnError: false
    })

    try {
      await process.done()

      return true
    } catch (error) {
      throw new NotFoundException(`[Error]:[S3] File has not found to update! ${error.message}`)
    }
  }

  // Delete file by key
  public async delete(key: string): Promise<boolean> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key
    })

    try {
      await this.client.send(command)

      return true
    } catch (error) {
      throw new NotFoundException(`[Error]:[S3] File has not found to delete! ${error.message}`)
    }
  }

  // Checks for existing bucket neither create it
  private async createBucket(bucketName: string): Promise<void> {
    const checkCommand = new HeadBucketCommand({
      Bucket: bucketName
    })

    try {
      await this.client.send(checkCommand)
    } catch (error) {
      if (error.$metadata.httpStatusCode == 404) {
        const createCommand = new CreateBucketCommand({
          Bucket: bucketName
        })

        await this.client.send(createCommand)
      } else throw error
    }
  }

  // Set public policy for presigned urls
  private async setPolicy(): Promise<void> {
    const command = new PutBucketPolicyCommand({
      Bucket: this.bucket,
      Policy: JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: "*",
            Action: [ "s3:GetObject" ],
            Resource: [ `arn:aws:s3:::${this.bucket}/*` ]
          }
        ]
      })
    })

    try {
      await this.client.send(command)
    } catch (error) {
      throw new GoneException(`[Error]:[S3] Policy has not been sent! ${error}`)
    }
  }
}