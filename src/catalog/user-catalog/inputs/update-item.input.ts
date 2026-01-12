import { Field, InputType } from '@nestjs/graphql'
import { IMAGE_REGEX } from '@src/common/constants/regex.constants'
import type { Nullable } from '@src/common/utils/nullable.util'
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator'

@InputType()
export class UpdateItemInput {
  @IsString()
  @IsOptional()
  @MaxLength(128)
  @Field(() => String, { nullable: true })
  readonly name: Nullable<string>

  @IsString()
  @IsOptional()
  @Matches(IMAGE_REGEX)
  @Field(() => String, { nullable: true })
  readonly image: Nullable<string>

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  @Field(() => String, { nullable: true })
  readonly description: Nullable<string>
}