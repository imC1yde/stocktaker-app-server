export const mapAuthorizedUser = (user, token) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  profileImage: user.profileImage,
  token: token
})