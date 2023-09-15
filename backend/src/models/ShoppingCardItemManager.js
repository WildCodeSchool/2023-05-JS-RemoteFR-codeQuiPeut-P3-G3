const AbstractManager = require("./AbstractManager")

class ShoppingCardItemManager extends AbstractManager {
  constructor() {
    super({ table: "shopping_card_item" })
  }

  insert(cardId, userId) {
    return this.database.query(
      `insert into ${this.table} (shop_credit_item_id, quantity, user_id) values (?,?,?)`,
      [cardId, 1, userId]
    )
  }

  update(shop) {
    return this.database.query(
      `UPDATE ${this.table} SET type = ?, name = ?, price = ?, quantity = ?, WHERE (id = ?)`,
      [shop.type, shop.name, shop.price, shop.quantity, shop.id]
    )
  }

  getProducts(userId) {
    return this.database.query(
      `SELECT sci2.price, sci2.credit_quantity FROM ${this.table} sci1 INNER JOIN shop_credit_item sci2 ON sci2.id = sci1.shop_credit_item_id WHERE sci1.user_id = ?`,
      [userId]
    )
  }
}

module.exports = ShoppingCardItemManager
