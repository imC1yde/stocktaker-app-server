import {
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    Length,
    Matches } from "class-validator";
import {EMAIL_REGEX} from "@src/common/constants/regex.constants";

class RegisterUserInput {
    @IsNotEmpty()
    @Length(3, 24)
    @IsString()
    username: string

    @IsNotEmpty()
    @Matches(EMAIL_REGEX)
    @IsString()
    email: string

    @IsStrongPassword({
        minLength: 8,
    })
    @IsNotEmpty()
    @IsString()
    password: string

    @IsStrongPassword({
        minLength: 8,
    })
    @IsNotEmpty()
    @IsString()
    confirmedPassword: string
}