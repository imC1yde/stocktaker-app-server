import { CreateGameInput } from '@src/catalog/game-catalog/inputs/create-game.input'

export const mapResultToInput = (data: any) => {
  return {
    rawgId: data.id,
    name: data.name,
    description: data?.description_raw || null,
    backgroundImage: data?.background_image || null,
    rating: data.rating || 0,
    released: data?.released || null,
    esrbRating: data?.esrbRating || null,
    genres: data.genres.map((genre) => genre.name),
    platforms: data.platforms.map((platform) => platform.name)
  } as CreateGameInput
}