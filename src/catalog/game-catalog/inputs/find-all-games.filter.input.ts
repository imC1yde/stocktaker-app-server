import { Field, Float, InputType } from '@nestjs/graphql'
import { EsrbRating } from '@src/common/enums/esrb-rating.enum'
import type { Nullable } from '@src/common/utils/nullable.util'
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class FindAllGamesFilterInput {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly name: Nullable<string>

  @IsNumber()
  @IsOptional()
  @Field(() => Float, { nullable: true })
  readonly rating: Nullable<number>

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [ String ], { nullable: true })
  readonly genres: Nullable<string[]>

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Field(() => [ String ], { nullable: true })
  readonly platforms: Nullable<string[]>

  @IsEnum(EsrbRating)
  @IsOptional()
  @Field(() => EsrbRating, { nullable: true })
  readonly esrbRating: Nullable<EsrbRating>
}