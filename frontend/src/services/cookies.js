export const getCookies = () => {
  const cookies = document.cookie.split("; ") // Divisez la chaîne de cookies en un tableau
  // Par défaut, authToken et user sont nuls
  let authToken = null
  let user = null
  // Parcourez les cookies pour trouver les cookies recherchés
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=")
    if (name === "authToken") {
      authToken = decodeURIComponent(value)
    } else if (name === "user") {
      user = decodeURIComponent(value)
    }
  }
  // Vérifiez si authToken et user sont définis pour définir logged à true
  const logged = authToken !== null && user !== null

  return { authToken, user, logged }
}
