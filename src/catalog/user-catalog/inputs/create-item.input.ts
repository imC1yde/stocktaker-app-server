import { Field, InputType } from "@nestjs/graphql"
import type { Nullable } from '@src/common/utils/nullable.util'
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator"

@InputType()
export class CreateItemInput {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @Field(() => String)
  readonly name: string

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  @Field(() => String, { nullable: true })
  readonly description: Nullable<string>
}