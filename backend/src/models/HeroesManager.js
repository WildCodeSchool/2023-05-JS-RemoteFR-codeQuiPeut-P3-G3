const AbstractManager = require("./AbstractManager")

class HeroManager extends AbstractManager {
  constructor() {
    super({ table: "heroes" })
  }

  insert(heroes) {
    return this.database.query(
      `insert into ${this.table} (class, name, health, max_health, money, weapon, strength, resistance, img_hero) values (?,?,?,?,?,?,?,?,?)`,
      [
        heroes.class,
        heroes.name,
        heroes.health,
        heroes.max_health,
        heroes.money,
        heroes.weapon,
        heroes.strength,
        heroes.resistance,
        heroes.img_hero,
      ]
    )
  }

  update(heroes) {
    return this.database.query(
      `UPDATE ${this.table} SET class = ?, name = ?, health = ?, max_health = ?, money = ?, weapon = ?, strength = ?, resistance = ?, img_hero = ? WHERE (id = ?)`,
      [
        heroes.class,
        heroes.name,
        heroes.health,
        heroes.max_health,
        heroes.money,
        heroes.weapon,
        heroes.strength,
        heroes.resistance,
        heroes.img_hero,
        heroes.id,
      ]
    )
  }
}

module.exports = HeroManager
