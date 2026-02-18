import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@src/common/types/user.type'

@ObjectType()
export class UserWithToken extends User {
  @Field(() => String)
  token: string
}