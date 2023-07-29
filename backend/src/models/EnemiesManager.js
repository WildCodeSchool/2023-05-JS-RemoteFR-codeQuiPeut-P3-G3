const AbstractManager = require("./AbstractManager")

class EnemyManager extends AbstractManager {
  constructor() {
    super({ table: "enemies" })
  }

  insert(enemies) {
    return this.database.query(
      `insert into ${this.table} (health, resistance, strength) values (?,?,?)`,
      [enemies.health, enemies.resistance, enemies.strength]
    )
  }

  update(enemies) {
    return this.database.query(
      `UPDATE ${this.table} SET health = ?, resistance = ?, strength = ?, WHERE (id = ?)`,
      [enemies.health, enemies.resistance, enemies.strength, enemies.id]
    )
  }
}

module.exports = EnemyManager
