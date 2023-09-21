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

const findByMail = (req, res, next) => {
  models.users
    .getUserByEmailAndPassToNext(req.body, req, res, next)
    .then((user) => {
      if (user) {
        // return res.status(200).json(user)
      } else {
        // return res
        //   .status(401)
        //   .json({ message: "Email ou mot de passe incorrect" })
      }
    })
    .catch((err) => {
      console.error(err)
      return err
    })
}

const editProfile = (req, res) => {
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

module.exports = {
  browse,
  add,
  read,
  edit,
  destroy,
  findByMail,
  editProfile,
}
