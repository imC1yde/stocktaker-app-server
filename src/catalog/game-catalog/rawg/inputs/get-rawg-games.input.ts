import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class GetRawgGamesInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
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