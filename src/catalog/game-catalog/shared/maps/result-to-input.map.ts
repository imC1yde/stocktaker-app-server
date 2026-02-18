import { CreateGameInput } from '@src/catalog/game-catalog/shared/inputs/create-game.input'

export const mapResultToInput = (data: any) => {
  return {
    rawgId: data.id,
    name: data.name,
    slug: data.slug,
    description: data?.description_raw || null,
    backgroundImage: data?.background_image || null,
    rating: data.rating || 0,
    released: data?.released || null,
    esrbRating: data?.esrb_rating?.name || null,
    genres: data.genres.map((genre) => genre.name),
    platforms: data.platforms.map(({ platform }) => platform?.name)
  } as CreateGameInput
}

// 742752d9-d15b-4b82-8129-8ba44884c5f0 40001