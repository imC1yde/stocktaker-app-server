import { registerEnumType } from '@nestjs/graphql'

export enum EsrbRating {
  EVERYONE = 'Everyone',
  EVERYONE_10_PLUS = 'Everyone 10+',
  TEEN = 'Teen',
  MATURE = 'Mature',
  ADULTS_ONLY = 'Adults Only',
  RATING_PENDING = 'Rating Pending'
}

registerEnumType(EsrbRating, {
  name: 'EsrbRating'
})