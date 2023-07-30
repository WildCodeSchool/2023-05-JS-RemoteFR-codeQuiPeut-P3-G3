const AbstractManager = require("./AbstractManager")

class ConsomableManager extends AbstractManager {
  constructor() {
    super({ table: "consomables" })
  }

  insert(consomables) {
    return this.database.query(
      `insert into ${this.table} (conso_name, conso_img, inventory_idinventory, inventory_heroes_idheroes) values (?,?,?,?)`,
      [
        consomables.conso_name,
        consomables.conso_img,
        consomables.inventory_idinventory,
        consomables.inventory_heroes_idheroes,
      ]
    )
  }

  update(consomables) {
    return this.database.query(
      `UPDATE ${this.table} SET conso_name = ?, conso_img = ?, inventory_idinventory = ?, inventory_heroes_idheroes = ?, WHERE (id = ?)`,
      [
        consomables.conso_name,
        consomables.conso_img,
        consomables.inventory_idinventory,
        consomables.inventory_heroes_idheroes,
        consomables.id,
      ]
    )
  }
}

module.exports = ConsomableManager
