const AbstractManager = require("./AbstractManager")

class InventoryManager extends AbstractManager {
  constructor() {
    super({ table: "inventory" })
  }

  insert(inventory) {
    return this.database.query(
      `insert into ${this.table} (heroes_idheroes) values (?)`,
      [inventory.heroes_idheroes]
    )
  }

  update(inventory) {
    return this.database.query(
      `update ${this.table} set heroes_idheroes = ?, WHERE id = ?`,
      [inventory.heroes_idheroes, inventory.id]
    )
  }
}

module.exports = InventoryManager
