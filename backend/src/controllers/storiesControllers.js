const models = require("../models")

const browse = (req, res) => {
  models.stories
    .findAll()
    .then(([rows]) => {
      res.send(rows)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const add = (req, res, next) => {
  const data = req.body

  models.stories
    .insert(data)
    .then(([result]) => {
      req.insertId = result.insertId
      next()
      // res
      //   .status(200)
      //   .json({ message: "Histoire ajoutée avec succès", id: result.insertId })
    })
    .catch((err) => {
      console.error(err)

      // Vérifiez si l'erreur est due à un titre déjà existant
      if (err.message === "Le titre existe déjà.") {
        return res
          .status(400)
          .json({ error: "Une histoire porte déjà le même nom." })
      }

      // res.status(500).json({ error: "Une erreur interne s'est produite." })
    })
}
const read = (req, res) => {
  models.stories
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
  const stories = req.body

  // TODO validations (length, format...)

  stories.id = parseInt(req.params.id, 10)
  if (req.params.scene) {
    stories.scene = parseInt(req.params.scene, 10)
  }

  models.stories
    .update(stories)
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
const destroy = (req, res, next) => {
  models.stories
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404)
      } else {
        // res.sendStatus(204)
        next()
      }
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}

const deploy = (req, res) => {
  const data = req.body
  data.id = req.params.id

  models.stories

    .deploy(data)
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
  deploy,
}
