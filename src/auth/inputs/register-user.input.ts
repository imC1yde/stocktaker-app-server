import { Field, InputType } from "@nestjs/graphql";
import { EMAIL_REGEX } from "@src/common/constants/regex.constants";
import { IsNotEmpty, IsStrongPassword, Length, Matches } from "class-validator";

const passwordSettings = {
  minLength: 8,
}

@InputType()
export class RegisterUserInput {
  @Field(() => String, { nullable: true })
  @Length(1, 32)
  username?: string;

  @IsNotEmpty()
  @Matches(EMAIL_REGEX)
  @Field(() => String)
  email: string

  @IsStrongPassword(passwordSettings)
  @IsNotEmpty()
  @Field(() => String)
  password: string
}