import { Field, ObjectType } from "@nestjs/graphql";
import type { Nullable } from "@src/common/utils/nullable.util";

@ObjectType()
export class User {
  @Field(() => String, { nullable: true })
  id: string

  @Field(() => String, { nullable: true })
  username: Nullable<string>;

  @Field(() => String, { nullable: true })
  profileImage: Nullable<string>;

  @Field(() => String)
  email: string
}