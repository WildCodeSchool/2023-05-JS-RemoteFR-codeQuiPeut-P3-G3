const AbstractManager = require("./AbstractManager")

class StoryManager extends AbstractManager {
  constructor() {
    super({ table: "stories" })
  }

  insert(data) {
    if (!data.title) {
      throw new Error("Le titre est vide.")
    }

    return this.database
      .query(`SELECT COUNT(*) as count FROM stories WHERE title = ?`, [
        data.title,
      ])
      .then((result) => {
        const count = result[0][0].count
        if (count === 0 || count === undefined) {
          return this.database.query(
            `INSERT INTO stories (title, creation_date, last_update, is_deploy) VALUES (?, NOW(), NOW(), 0)`,
            [data.title]
          )
        } else {
          throw new Error("Le titre existe déjà.")
        }
      })
  }

  update(stories) {
    return this.database.query(
      `UPDATE ${this.table} SET title = ?, resume = ?, creation_date = ?, last_update = ?, number_view = ?, win_rate = ?, money_earn = ?, is_deploy = ?, heroes_idheroes = ?, img_url = ?, category = ?, shop_id = ?, is_complete = ?, publicCategory = ? WHERE (id = ?)`,
      [
        stories.title,
        stories.resume,
        stories.creation_date,
        stories.last_update,
        stories.number_view,
        stories.win_rate,
        stories.money_earn,
        stories.is_deploy,
        stories.heroes_idheroes,
        stories.img_url,
        stories.category,
        stories.shop_id,
        stories.is_complete,
        stories.publicCategory,
        stories.id,
      ]
    )
  }

  deploy(stories) {
    const { id, deploy } = stories
    return this.database.query(
      `UPDATE ${this.table} SET is_deploy = ? WHERE (id = ?)`,
      [deploy, id]
    )
  }

  deleteStoryWithCard(id) {
    return this.database.query(
      `DELETE t, c FROM ${this.table} as t
      INNER JOIN card AS c ON  t.card_idcard = c.idcard
      WHERE t.id = ?`,
      [id]
    )
  }
}

module.exports = StoryManager
