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

  register(users) {
    return this.database
      .query(`SELECT mail FROM ${this.table} WHERE mail = ?`, [
        users.mail,
        users.pseudo,
      ])
      .then((results) => {
        if (results[0].length > 0) {
          return Promise.reject(new Error("Email already in use"))
        } else {
          return this.database.query(
            `SELECT pseudo FROM ${this.table} WHERE pseudo = ?`,
            [users.pseudo]
          )
        }
      })
      .then((pseudoResults) => {
        if (pseudoResults[0].length > 0) {
          return Promise.reject(new Error("Pseudo already in use"))
        } else if (users.pwd !== users.confirmPassword) {
          return Promise.reject(new Error("Passwords do not match"))
        }
        // Si toutes les vérifications passent, effectuer l'insertion
        return this.insert(users)
      })
  }

  getUserByEmailAndPassToNext(users, req, res, next) {
    return this.database
      .query("SELECT * FROM users WHERE mail = ?", [users.mail])
      .then(([rows]) => {
        if (rows.length > 0) {
          const user = rows[0]
          req.user = user
          next()
        } else {
          return Promise.reject(
            new Error("Aucun utilisateur trouvé avec cet e-mail")
          )
        }
      })
      .catch((err) => {
        console.error(err)
        return Promise.reject(
          new Error(
            "Erreur lors de la récupération des données depuis la base de données"
          )
        )
      })
  }
}
module.exports = UserManager
