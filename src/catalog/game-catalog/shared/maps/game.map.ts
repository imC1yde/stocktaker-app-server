export const mapGame = ({ data, isCompleted }: any) => {
  return {
    id: data.id,
    rawgId: data.id,
    name: data.name,
    isCompleted: isCompleted,
    description: data?.description_raw,
    backgroundImage: data?.background_image,
    rating: data.rating,
    released: data?.released,
    esrbRating: data?.esrbRating,
    genres: data.genres,
    platforms: data.platforms
  }
}