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

const verifyPassword = (req, res) => {
  argon2

    .verify(req.user.hashedPassword, req.body.pwd)

    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        })
        delete req.user.hashedPassword
        res.status(200).send({ success: true, token, user: req.user })
      } else {
        return Promise.reject(new Error("Password do not match"))
      }
    })

    .catch((err) => {
      console.error(err)

      return Promise.reject(new Error("Password do not match"))
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
module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
}
