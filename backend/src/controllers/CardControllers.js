const models = require("../models")

const browse = (req, res) => {
  models.card
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
  const card = req.body

  models.card
    .insert(card)
    .then((insertedCardId) => {
      res.status(201).json({
        message: "Card saved successfully",
        cardId: insertedCardId,
      })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({
        error: "An error occurred while saving the card",
      })
    })
}

const read = (req, res) => {
  models.card
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
  const card = req.body

  // TODO validations (length, format...)

  card.id = parseInt(req.params.id, 10)

  models.card
    .update(card)
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
  models.card
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

module.exports = {
  browse,
  add,
  read,
  edit,
  destroy,
}
