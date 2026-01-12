import { Field, InputType } from '@nestjs/graphql'
import { EMAIL_REGEX } from '@src/common/constants/regex.constants'
import type { Nullable } from '@src/common/utils/nullable.util'
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly username: Nullable<string>

  @IsString()
  @IsNotEmpty()
  @Matches(EMAIL_REGEX)
  @Field(() => String)
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  readonly hashed: string
}