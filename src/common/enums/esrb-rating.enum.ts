import { registerEnumType } from '@nestjs/graphql'
import { EsrbRating } from '@prisma/client'

registerEnumType(EsrbRating, {
  name: 'EsrbRating'
})

export { EsrbRating }