const AbstractManager = require("./AbstractManager")

class ChoiceManager extends AbstractManager {
  constructor() {
    super({ table: "choices" })
  }

  insert(choices) {
    return this.database.query(
      `insert into ${this.table} (button_text, next_chapter) values (?,?)`,
      [choices.button_text, choices.next_chapter]
    )
  }

  update(choices) {
    return this.database.query(
      `update ${this.table} set button_text = ?, next_chapter = ?, WHERE id = ?`,
      [choices.button_text, choices.next_chapter, choices.id]
    )
  }
}

module.exports = ChoiceManager
