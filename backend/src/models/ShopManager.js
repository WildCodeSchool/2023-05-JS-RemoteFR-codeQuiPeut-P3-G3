const AbstractManager = require("./AbstractManager")

class ShopManager extends AbstractManager {
  constructor() {
    super({ table: "shop" })
  }

  insert(shop) {
    return this.database.query(
      `insert into ${this.table} (type, name, price, quantity) values (?,?,?,?)`,
      [shop.type, shop.name, shop.price, shop.quantity]
    )
  }

  update(shop) {
    return this.database.query(
      `UPDATE ${this.table} SET type = ?, name = ?, price = ?, quantity = ?, WHERE (id = ?)`,
      [shop.type, shop.name, shop.price, shop.quantity, shop.id]
    )
  }
}

module.exports = ShopManager
