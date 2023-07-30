const AbstractManager = require("./AbstractManager")

class WeaponManager extends AbstractManager {
  constructor() {
    super({ table: "weapons" })
  }

  insert(weapons) {
    return this.database.query(
      `insert into ${this.table} (name, description, image, buy_price, sell_price, damage, inventory_idinventory, inventory_heroes_idheroes) values (?,?,?,?,?,?,?,?)`,
      [
        weapons.name,
        weapons.description,
        weapons.image,
        weapons.buy_price,
        weapons.sell_price,
        weapons.damage,
        weapons.inventory_idinventory,
        weapons.inventory_heroes_idheroes,
      ]
    )
  }

  update(weapons) {
    return this.database.query(
      `UPDATE ${this.table} SET name = ?, description = ?, image = ?, buy_price = ?, sell_price = ?, damage = ?, inventory_idinventory = ?, inventory_heroes_idheroes = ? WHERE (id = ?)`,
      [
        weapons.name,
        weapons.description,
        weapons.image,
        weapons.buy_price,
        weapons.sell_price,
        weapons.damage,
        weapons.inventory_idinventory,
        weapons.inventory_heroes_idheroes,
        weapons.id,
      ]
    )
  }
}

module.exports = WeaponManager
