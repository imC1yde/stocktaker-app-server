import { Field, Float, ObjectType } from '@nestjs/graphql'
import type { Nullable } from '@src/common/utils/nullable.util'

@ObjectType()
export class GameListResponse {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String, { nullable: true })
  backgroundImage: string

  @Field(() => Boolean)
  isCompleted: boolean

  @Field(() => Float)
  rating: number

  @Field(() => [ String ])
  platforms: string[]

  @Field(() => [ String ])
  genres: string[]

  @Field(() => String, { nullable: true })
  esrbRating: Nullable<string>
}