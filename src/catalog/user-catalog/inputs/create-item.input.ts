import { Field, InputType } from "@nestjs/graphql";
import { IMAGE_REGEX } from "@src/common/constants/regex.constants";
import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

@InputType()
export class CreateItemInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @Matches(IMAGE_REGEX)
  @Field(() => String)
  readonly image: string

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly description: string
}