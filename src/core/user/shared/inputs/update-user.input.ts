import { Field, InputType } from '@nestjs/graphql'
import type { Nullable } from '@src/common/utils/nullable.util'
import { IsOptional, IsString } from 'class-validator'

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly username: Nullable<string>
}