import { Field, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class User {
  @Field(() => String, { nullable: true })
  username?: string

  @Field(() => String, { nullable: true })
  profileImage?: string

  @IsNotEmpty()
  @Field(() => String)
  email: string

  @IsNotEmpty()
  @Field(() => String)
  password: string
}