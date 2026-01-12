import { RawgGames } from '@src/catalog/game-catalog/shared/types/rawg-game.type'

export const mapRawgList = (result: any[]) => {
  return result.map(item => ({
    rawgId: item.id,
    name: item.name,
    backgroundImage: item?.background_image,
    rating: item.rating,
    released: item?.released,
    esrbRating: item?.esrbRating,
    genres: item.genres.map((genre) => genre.name),
    platforms: item.platforms.map((platform) => platform.name)
  })) as RawgGames[]
}