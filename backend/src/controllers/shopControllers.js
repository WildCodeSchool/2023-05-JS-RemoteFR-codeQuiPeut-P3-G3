const models = require("../models")

const browse = (req, res) => {
  models.shop
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
  const cardShopId = req.body.cardShopId
  models.ShoppingCardItem.getProducts(cardShopId)
    .then(([result]) => {
      res.json(result.insertId)
      console.info("Step 2 OK \n Envoi de l'id de la carte selectionner")
      console.info(result)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
}
const read = (req, res) => {
  models.shop
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

// const edit = (req, res) => {
//   const shop = req.params.id

//   // TODO validations (length, format...)

//   shop.id = parseInt(req.params.id, 10)

//   models.shop
//     .insert(shop)
//     .then(([result]) => {
//       if (result.affectedRows === 0) {
//         res.sendStatus(404)
//       } else {
//         res.sendStatus(204)
//       }
//     })
//     .catch((err) => {
//       console.error(err)
//       res.sendStatus(500)
//     })
// }

// ---------------CHATGPT -------------
const edit = async (req, res) => {
  const shopId = req.params.id

  try {
    // Récupérer les données de shop_credit_item avec l'ID spécifié
    const [shopData] = await models.shop.find(shopId)

    // Vérifier si les données existent
    if (!shopData) {
      return res.status(404).send("Item not found")
    }

    // Adaptez shopData pour qu'il corresponde à ce que la méthode add attend
    const itemToInsert = {
      shop_credit_item_id: shopId,
      quantity: 1,
      user_id: 1, // ATTENTION USER MIS EN BRUT A MODIFIER POUR ADAPTER  PLUS TARD AUX CHANGEMENTS DE USER
    }

    // Insérez dans la table shopping_card_item
    const result = await models.ShoppingCardItem.add(itemToInsert)

    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res.status(500).send("Server error")
  }
}

// ------------------------------------

const destroy = (req, res) => {
  models.shop
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

const getCart = (req, res) => {
  const userId = 1
  models.ShoppingCardItem.getProducts(userId)
    .then(([rows]) => {
      res.send(rows)
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
  getCart,
}
