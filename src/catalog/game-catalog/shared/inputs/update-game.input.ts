import { Field, InputType } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class UpdateGameInput {
  @IsString()
  @IsNotEmpty()
  @Field(() => Boolean)
  readonly id: string

  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean)
  readonly isCompleted: boolean
}