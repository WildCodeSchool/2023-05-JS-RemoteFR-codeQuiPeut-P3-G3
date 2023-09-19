const argon2 = require("argon2")
const jwt = require("jsonwebtoken")

const hashingOptions = {
  type: argon2.argon2id,

  memoryCost: 2 ** 16,

  timeCost: 5,

  parallelism: 1,
}

// const hashPassword = (req, res, next) => {
//   argon2

//     .hash(req.body.pwd, hashingOptions)

//     .then((hashedPassword) => {
//       req.body.hashedPassword = hashedPassword

//       delete req.body.pwd
//       next()
//     })

//     .catch((err) => {
//       console.error(err)

//       res.sendStatus(500)
//     })
// }

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

const verifyPassword = (req, res, next) => {
  argon2

    .verify(req.user.hashedPassword, req.body.pwd)

    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id, role: req.user.role }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })
        delete req.user.hashedPassword
        return res.status(200).send({ success: true, token, user: req.user })
      } else {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" })
      }
    })

    .catch((err) => {
      console.error(err)
    })
}

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization")
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing")
    }

    const [type, token] = authorizationHeader.split(" ")

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type")
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET)

    next()
  } catch (err) {
    console.error(err)

    res.sendStatus(403)
  }
}

const verifyAdminRole = (req, res, next) => {
  try {
    // Vérifiez si le token JWT a été correctement décodé par le middleware verifyToken
    if (!req.payload) {
      throw new Error("Invalid token or missing payload")
    }

    // Récupérez le rôle de l'utilisateur à partir du payload du token
    const userRole = req.payload.role

    // Vérifiez si l'utilisateur a le rôle "admin" (ou le rôle approprié pour les administrateurs)
    if (userRole === "admin") {
      // L'utilisateur est un administrateur, autorisez l'accès
      next()
    } else {
      // L'utilisateur n'a pas le rôle d'administrateur, renvoyez une erreur 403 (Accès refusé)
      res.status(403).json({
        message: "Not Allowed",
      })
    }
  } catch (err) {
    console.error(err)
    res
      .status(403)
      .json({ message: "Erreur de vérification du rôle d'administrateur." })
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdminRole,
}
