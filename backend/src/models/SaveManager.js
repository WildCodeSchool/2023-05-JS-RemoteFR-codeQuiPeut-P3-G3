const AbstractManager = require("./AbstractManager")

class SaveManager extends AbstractManager {
  constructor() {
    super({ table: "save" })
  }

  insert(save) {
    return this.database.query(
      `insert into ${this.table} (SOMETHING) values (?)`,
      [save.SOMETHING]
    )
  }

  update(save) {
    return this.database.query(
      `update ${this.table} set SOMETHING = ?, WHERE id = ?`,
      [save.SOMETHING, save.id]
    )
  }
}

module.exports = SaveManager
