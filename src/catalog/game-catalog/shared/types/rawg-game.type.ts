import { ObjectType, OmitType } from '@nestjs/graphql'
import { Game } from '@src/common/types/game.type'

@ObjectType()
export class RawgGames extends OmitType<Game, 'isCompleted' | 'description'>
(Game, [ 'isCompleted', 'description' ]) {}
