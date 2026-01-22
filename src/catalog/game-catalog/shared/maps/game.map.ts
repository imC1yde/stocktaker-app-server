import { Game } from '@src/common/types/game.type'

export const mapGame = ({ data, isCompleted }: any) => {
  return {
    id: data.id,
    rawgId: data.rawgId,
    name: data.name,
    isCompleted: isCompleted,
    description: data?.description_raw,
    backgroundImage: data?.background_image,
    rating: data.rating,
    released: data?.released,
    esrbRating: data?.esrbRating,
    genres: data.genres,
    platforms: data.platforms
  } as Game
}