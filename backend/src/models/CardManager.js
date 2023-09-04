const AbstractManager = require("./AbstractManager")

class CardManager extends AbstractManager {
  constructor() {
    super({ table: "card" })
  }

  insert(card) {
    return this.database.query(
      `insert into ${this.table} (titleFontFamily, titleFontSize, titleFontColor, topBgdColor, topBgdImg,  textFontFamily, textFontColor, bottomBgdColor, bottomBgdImg, buttonTextFont, buttonTextColor ) values (?,?,?,?,?,?,?,?,?,?,?)`,
      [
        card.titleFontFamily,
        card.titleFontSize,
        card.titleFontColor,
        card.topBgdColor,
        card.topBgdImg,
        card.textFontFamily,
        card.textFontColor,
        card.bottomBgdColor,
        card.bottomBgdImg,
        card.buttonTextFont,
        card.buttonTextColor,
      ]
    )
  }

  update(card) {
    return this.database.query(
      `UPDATE ${this.table} SET titleFontFamily = ?, titleFontSize = ?, titleFontColor = ?, topBgdColor = ?, topBgdImg = ?,  textFontFamily = ?, textFontColor = ?, bottomBgdColor = ?, bottomBgdImg = ?, buttonTextFont = ?, buttonTextColor = ? WHERE (id = ?)`,
      [
        card.titleFontFamily,
        card.titleFontSize,
        card.titleFontColor,
        card.topBgdColor,
        card.topBgdImg,
        card.textFontFamily,
        card.textFontColor,
        card.bottomBgdColor,
        card.bottomBgdImg,
        card.buttonTextFont,
        card.buttonTextColor,
        card.id,
      ]
    )
  }
}

module.exports = CardManager
