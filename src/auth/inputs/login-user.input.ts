import { Field, InputType } from "@nestjs/graphql";
import { EMAIL_REGEX } from "@src/common/constants/regex.constants";
import { IsNotEmpty, IsStrongPassword, Matches } from "class-validator";

const passwordSettings = {
  minLength: 8,
}

@InputType()
export class LoginUserInput {
  @IsNotEmpty()
  @Matches(EMAIL_REGEX)
  @Field(() => String)
  email: string

  @IsStrongPassword(passwordSettings)
  @IsNotEmpty()
  @Field(() => String)
  password: string
}