import { Field } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty } from 'class-validator'

export class UpdateGameInput {
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean)
  readonly isCompleted: boolean
}