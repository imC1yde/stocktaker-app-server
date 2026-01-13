import { Field, Float, Int, ObjectType } from '@nestjs/graphql'
import { EsrbRating } from '@src/common/enums/esrb-rating.enum'
import type { Nullable } from '@src/common/utils/nullable.util'

@ObjectType()
export class Game {
  @Field(() => String)
  id: string

  @Field(() => Int)
  rawgId: number

  @Field(() => String)
  name: string

  @Field(() => Boolean)
  isCompleted: boolean

  @Field(() => String, { nullable: true })
  description: Nullable<string>

  @Field(() => String, { nullable: true })
  backgroundImage: Nullable<string> // image 1200x400px

  @Field(() => Float)
  rating: number

  @Field(() => Date, { nullable: true })
  released: Nullable<Date>

  @Field(() => EsrbRating, { nullable: true })
  esrbRating?: Nullable<EsrbRating>

  @Field(() => [ String ])
  genres: string[]

  @Field(() => [ String ])
  platforms: string[]
}
