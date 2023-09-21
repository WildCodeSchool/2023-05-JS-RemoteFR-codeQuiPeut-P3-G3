const AbstractManager = require("./AbstractManager")

class ShoppingCardItemManager extends AbstractManager {
  constructor() {
    super({ table: "shopping_card_item" })
  }

  insert(cardId, userId) {
    return this.database.query(
      `insert into ${this.table} (shop_credit_item_id, quantity, user_id) values (?,?,?)`,
      console.info("1.1"),
      [(cardId, 1, userId)]
    )
  }

  update(shop) {
    return this.database.query(
      `UPDATE ${this.table} SET type = ?, name = ?, price = ?, quantity = ?, WHERE (id = ?)`,
      console.info("1.2"),
      [shop.type, shop.name, shop.price, shop.quantity, shop.id]
    )
  }

  add(item) {
    return this.database.query(
      `INSERT INTO shopping_card_item (shop_credit_item_id, quantity, user_id) VALUES (?, ?, ?)`,
      [item.shop_credit_item_id, item.quantity, item.user_id]
    )
  }

  deleteAll() {
    return this.database.query(`DELETE FROM ${this.table}`)
  }
}

module.exports = ShoppingCardItemManager
