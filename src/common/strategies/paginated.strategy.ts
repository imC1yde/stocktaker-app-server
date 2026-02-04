import type { Type } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'

export function Paginated<TData>(classRef: Type<TData>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [ classRef ])
    public readonly data: TData[]

    @Field(() => Int)
    public readonly totalCount: number

    @Field(() => Int)
    public readonly totalPages: number

    @Field(() => Boolean)
    public readonly hasNextPage: boolean
  }

  return PaginatedType
}