import { Field, Float, ID } from '@nestjs/graphql'
import type { Nullable } from '@src/common/utils/nullable.util'
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateGameInput {
  @IsInt()
  @IsNotEmpty()
  @Field(() => ID)
  readonly rawgId: number

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  readonly slug: string

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly description: Nullable<string>

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly backgroundImage: Nullable<string>

  @IsInt()
  @Field(() => Float, { defaultValue: 0 })
  readonly rating: number

  @IsString()
  @Field(() => Date, { nullable: true })
  readonly released: Nullable<Date>

  @IsArray()
  @Field(() => [ String ], { nullable: true })
  readonly esrbRating: Nullable<string>

  @IsArray()
  @Field(() => [ String ])
  readonly platforms: string[]

  @IsArray()
  @Field(() => [ String ])
  readonly genres: string[]
}