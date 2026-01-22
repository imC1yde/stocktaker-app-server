import { EsrbRating } from '@prisma/client'

export class GameValidator {
  public static parseEsrbRating(esrbRating: string): EsrbRating {
    const ratingRecord: Record<string, EsrbRating> = {
      ['Everyone']: EsrbRating.EVERYONE,
      ['Everyone 10+']: EsrbRating.EVERYONE_10_PLUS,
      ['Mature']: EsrbRating.MATURE,
      ['Teen']: EsrbRating.TEEN,
      ['Adults Only']: EsrbRating.ADULTS_ONLY,
      ['Rating Pending']: EsrbRating.RATING_PENDING
    }

    return ratingRecord[esrbRating]
  }
}