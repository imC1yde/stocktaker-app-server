import { Field, Float, Int } from '@nestjs/graphql'
import { EsrbRating } from '@src/common/enums/esrb-rating.enum'
import type { Nullable } from '@src/common/utils/nullable.util'
import { IsArray, IsDate, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateGameInput {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
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

  @IsNumber()
  @Field(() => Float, { defaultValue: 0 })
  readonly rating: number

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  readonly released: Nullable<Date>

  @IsEnum(EsrbRating)
  @IsOptional()
  @Field(() => EsrbRating, { nullable: true })
  readonly esrbRating: Nullable<EsrbRating>

  @IsArray()
  @IsString({ each: true })
  @Field(() => [ String ])
  readonly platforms: string[]

  @IsArray()
  @IsString({ each: true })
  @Field(() => [ String ])
  readonly genres: string[]
}