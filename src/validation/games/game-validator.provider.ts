import { Injectable } from '@nestjs/common'
import { EsrbRating } from '@prisma/client'
import type { Nullable } from '@src/common/utils/nullable.util'
import { GameValidator } from '@src/validation/games/game.validator'

@Injectable()
export class GameValidatorProvider {
  public parseEsrbRating(esrbRating: Nullable<string>): Nullable<EsrbRating> {
    if (!esrbRating) return null
    return GameValidator.parseEsrbRating(esrbRating)
  }
}