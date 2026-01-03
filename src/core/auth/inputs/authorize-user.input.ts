import { Field, InputType } from "@nestjs/graphql"
import { PASSWORD_SETTINGS } from "@src/common/constants/password-settings.constant"
import { EMAIL_REGEX } from "@src/common/constants/regex.constants"
import { IsNotEmpty, IsString, IsStrongPassword, Matches } from "class-validator"

@InputType()
export class AuthorizeUserInput {
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