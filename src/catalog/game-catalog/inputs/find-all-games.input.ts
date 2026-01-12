import { Field, InputType, Int } from '@nestjs/graphql'
import { IsInt, IsNotEmpty } from 'class-validator'

@InputType()
export class FindAllGamesInput {
  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  readonly page: number

  @IsInt()
  @IsNotEmpty()
  @Field(() => Int)
  readonly pageSize: number
}