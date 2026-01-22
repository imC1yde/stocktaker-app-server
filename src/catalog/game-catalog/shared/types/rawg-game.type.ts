import { Field, ObjectType } from '@nestjs/graphql'
import type { Nullable } from '@src/common/utils/nullable.util'

@ObjectType()
export class RawgGame {
  @Field(() => Number)
  rawgId: number

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  backgroundImage: Nullable<string>
}
