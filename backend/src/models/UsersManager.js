const AbstractManager = require("./AbstractManager")

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" })
  }

  insert(users) {
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, hashedPassword, mail, pseudo,  coins, experience, actual_chapter) values (?,?,?,?,?,?,?,?)`,
      [
        users.firstname,
        users.lastname,
        users.hashedPassword,
        users.mail,
        users.pseudo,
        users.coins,
        users.experience,
        users.actual_chapter,
      ]
    )
  }

  update(users) {
    return this.database.query(
      `UPDATE ${this.table} SET firstname = ?, lastname = ?, hashedPassword = ?, mail = ?, pseudo = ?,  coins = ?, experience = ?, actual_chapter = ? WHERE (id = ?)`,
      [
        users.firstname,
        users.lastname,
        users.hashedPassword,
        users.mail,
        users.pseudo,
        users.coins,
        users.experience,
        users.actual_chapter,
        users.id,
      ]
    )
  }
}

module.exports = UserManager
