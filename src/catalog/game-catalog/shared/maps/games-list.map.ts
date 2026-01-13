export const mapGamesList = (inventory: any) => {
  return inventory.map(
    ({ isCompleted, game }) => ({
      id: game.id,
      rawgId: game.id,
      name: game.name,
      backgroundImage: game.background_image,
      isCompleted: isCompleted,
      rating: game.rating,
      platforms: game.platforms,
      genres: game.genres,
      esrbRating: game.esrbRating
    }))
}