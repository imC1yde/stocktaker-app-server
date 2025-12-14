import {
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
    Matches } from "class-validator";
import {EMAIL_REGEX} from "@src/common/constants/regex.constants";
import { Field } from "@nestjs/graphql";

class RegisterUserInput {
    @IsNotEmpty()
    @Length(3, 24)
    @Field(() => String)
    username: string

    @IsNotEmpty()
    @Matches(EMAIL_REGEX)
    @Field(() => String)
    email: string

    @IsStrongPassword({
        minLength: 8,
    })
    @IsNotEmpty()
    @Field(() => String)
    password: string

    @IsStrongPassword({
        minLength: 8,
    })
    @IsNotEmpty()
    @Field(() => String)
    confirmedPassword: string
}