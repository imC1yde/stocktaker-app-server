import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateGameInput {
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean)
  readonly isCompleted: boolean
}