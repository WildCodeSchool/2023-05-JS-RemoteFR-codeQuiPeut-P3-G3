const models = require("../models")

const browse = (req, res) => {
  models.users
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const add = (req, res) => {
  const users = req.body

  models.users
    .register(users)
    .then((insertedUserId) => {
      res.status(200).json({
        message: "User registered successfully",
        userId: insertedUserId,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: "An error occurred while registering the user",
      })
    })
}

const read = (req, res) => {
  models.users
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404)
      } else {
        res.send(rows[0])
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const edit = (req, res) => {
  const users = req.body

  // TODO validations (length, format...)

  users.id = parseInt(req.params.id, 10)

  models.users
    .update(users)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const destroy = (req, res) => {
  models.users
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

/* ================================================= */

const findByMail = (req, res, next) => {
  // Récupère les informations de connexion depuis le corps de la requête.
  const { mail, pwd } = req.body

  // Vérifie que l'e-mail et le mot de passe sont fournis.
  if (!mail || !pwd) {
    return res
      .status(401)
      .json({ message: "Adresse e-mail et mot de passe requis" })
  }

  // Appelle la méthode du modèle "users" pour rechercher un utilisateur par e-mail et mot de passe.
  models.users
    .browseMail(mail, req, next)
    .then((user) => {
      // Si un utilisateur est trouvé
      if (user) {
        // Passe les informations de l'utilisateur à la prochaine fonction middleware (next).
        req.user = user
        next()
      } else {
        // Sinon réponse avec un statut non autorisé si l'utilisateur n'est pas trouvé.
        res.status(401).json({ message: "Adresse e-mail inconnue" })
      }
    })
    .catch((error) => {
      // En cas d'erreur, affiche l'erreur dans la console et renvoie une réponse avec un statut serveur interne.
      console.error(error)
      res.status(500).json({ error: "Erreur interne du serveur" })
    })
}

/* ================================================= */

const editProfile = (req, res) => {
  const users = req.body

  users.id = parseInt(req.params.id, 10)

  models.users
    .update(users)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        res.sendStatus(204)
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

module.exports = {
  browse,
  add,
  read,
  edit,
  destroy,
  findByMail,
  editProfile,
}
