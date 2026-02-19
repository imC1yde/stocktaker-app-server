import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class GetRawgGamesInput {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  readonly search: string

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  readonly page: number

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  readonly pageSize: number
}