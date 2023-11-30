const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
}

const hashPassword = (req, res, next) => {
  const password = req.body.pwd
  const confirmPassword = req.body.confirmPassword

  Promise.all([
    argon2.hash(password, hashingOptions),
    argon2.hash(confirmPassword, hashingOptions),
  ])
    .then((hashedPasswords) => {
      req.body.hashedPassword = hashedPasswords[0]
      req.body.hashedConfirmPassword = hashedPasswords[1]
      next()
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

// MDP
const verifyPassword = (req, res, next) => {
  // Vérifie le mot de passe avec Argon2
  argon2
    .verify(req.user.hashedPassword, req.body.pwd)
    .then((isVerified) => {
      if (isVerified) {
        // Crée un jeton JWT en cas de succès
        const payload = { sub: req.user.id, role: req.user.role }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })

        // Supprime le mot de passe haché avant de renvoyer la réponse
        delete req.user.hashedPassword

        // Renvoie le jeton et les informations de l'utilisateur
        res.status(200).send({ success: true, token, user: req.user })
      } else {
        // Renvoie une réponse non autorisée en cas d'échec de vérification du mot de passe
        res.status(401).json({ message: "Email ou mot de passe incorrect" })
      }
    })
    .catch((err) => {
      // Gère les erreurs, évite de divulguer des détails spécifiques
      console.error("Erreur lors de la vérification du mot de passe:", err)
      res.status(500).json({ message: "Erreur interne du serveur" })
    })
}

// ===== TOKEN =====
const verifyToken = (req, res, next) => {
  const authorizationHeader = req.get("Authorization")

  if (!authorizationHeader) {
    return res.status(401).json({ error: "Authorization header is missing" })
  }

  const [type, token] = authorizationHeader.split(" ")

  if (type !== "Bearer") {
    return res
      .status(401)
      .json({ error: "Authorization header has not the 'Bearer' type" })
  }

  try {
    req.payload = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch (error) {
    return res.status(401).json({ error: "Error verifying the token" })
  }
}

// ===== ROLE =====
const verifyAdminRole = (req, res, next) => {
  console.log("Vérification du rôle d'administrateur en cours")

  if (!req.payload) {
    console.error("Token invalide ou payload manquant")
    return res
      .status(403)
      .json({ message: "Token invalide ou payload manquant" })
  }

  // Récupération du rôle à partir du payload du token
  const userRole = req.payload.role
  console.log("Rôle : ", userRole)

  // Vérifier si l'utilisateur a le rôle "admin"
  if (userRole === "admin") {
    next()
  } else {
    console.error("Non autorisé")
    return res.status(403).json({ message: "Non autorisé" })
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdminRole,
}
