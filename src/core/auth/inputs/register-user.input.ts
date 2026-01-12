import { Field, InputType } from "@nestjs/graphql";
import { PASSWORD_SETTINGS } from '@src/common/constants/password-settings.constant'
import { EMAIL_REGEX } from '@src/common/constants/regex.constants'
import type { Nullable } from '@src/common/utils/nullable.util'
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword, Matches } from "class-validator";

@InputType()
export class RegisterUserInput {
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
  @IsStrongPassword(PASSWORD_SETTINGS)
  @Field(() => String)
  readonly password: string
}