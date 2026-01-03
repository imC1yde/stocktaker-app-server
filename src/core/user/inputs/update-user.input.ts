import { Field, InputType } from '@nestjs/graphql'
import { IMAGE_REGEX } from '@src/common/constants/regex.constants'
import type { Nullable } from '@src/common/utils/nullable'
import { IsOptional, IsString, Matches } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly username: Nullable<string>

  @IsString()
  @IsOptional()
  @Matches(IMAGE_REGEX)
  @Field(() => String, { nullable: true })
  readonly profileImage: Nullable<string>
}