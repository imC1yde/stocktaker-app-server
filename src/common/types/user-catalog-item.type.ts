import { Field, ObjectType } from "@nestjs/graphql";
import type { Nullable } from '@src/common/utils/nullable.util'

@ObjectType()
export class UserCatalogItem {
  @Field(() => String)
  id: string

  @Field(() => String)
  name: string

  @Field(() => String)
  image: string

  @Field(() => String, { nullable: true })
  description: Nullable<string>
}