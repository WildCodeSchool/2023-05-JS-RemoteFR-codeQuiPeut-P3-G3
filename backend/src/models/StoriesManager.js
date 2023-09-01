const AbstractManager = require("./AbstractManager")

class StoryManager extends AbstractManager {
  constructor() {
    super({ table: "stories" })
  }

  insert(stories) {
    return this.database.query(
      `insert into ${this.table} (title, resume, creation_date, last_update, number_view, win_rate, money_earn, is_deploy, heroes_idheroes, img_url, category, shop_id, is_complete, publicCategory) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
      ]
    )
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
}

module.exports = StoryManager
