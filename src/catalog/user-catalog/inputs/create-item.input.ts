import { Field, InputType } from "@nestjs/graphql";
import { IMAGE_REGEX } from "@src/common/constants/regex.constants";
import type { Nullable } from '@src/common/utils/nullable.util'
import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";

@InputType()
export class CreateItemInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @Field(() => String)
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @Matches(IMAGE_REGEX)
  @Field(() => String)
  readonly image: string

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  @Field(() => String, { nullable: true })
  readonly description: Nullable<string>
}