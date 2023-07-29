const AbstractManager = require("./AbstractManager")

class ChapterManager extends AbstractManager {
  constructor() {
    super({ table: "chapters" })
  }

  insert(chapters) {
    return this.database.query(
      `insert into ${this.table} (title, text, is_battle, stories_id, stories_heroes_idheroes, enemies_enemy_id) values (?,?,?,?,?,?)`,
      [
        chapters.title,
        chapters.text,
        chapters.is_battle,
        chapters.stories_id,
        chapters.stories_heroes_idheroes,
        chapters.enemies_enemy_id,
      ]
    )
  }

  update(chapters) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ?, text = ?, is_battle = ?, stories_id = ?, stories_heroes_idheroes = ?, enemies_enemy_id = ? WHERE (id = ?)`,
      [
        chapters.title,
        chapters.text,
        chapters.is_battle,
        chapters.stories_id,
        chapters.stories_heroes_idheroes,
        chapters.enemies_enemy_id,
        chapters.id,
      ]
    )
  }
}

module.exports = ChapterManager
