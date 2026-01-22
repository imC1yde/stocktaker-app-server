import { RawgGame } from '@src/catalog/game-catalog/shared/types/rawg-game.type'

export const mapRawgList = (result: any[]) => {
  return result.map(item => ({
    rawgId: item.id,
    name: item.name,
    backgroundImage: item?.background_image
  })) as RawgGame[]
}