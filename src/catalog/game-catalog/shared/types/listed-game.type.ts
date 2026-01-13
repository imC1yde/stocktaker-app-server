import { ObjectType, OmitType } from '@nestjs/graphql'
import { Game } from '@src/common/types/game.type'

@ObjectType()
export class ListedGame extends OmitType(Game,
  [
    'description',
    'released'
  ]) {}