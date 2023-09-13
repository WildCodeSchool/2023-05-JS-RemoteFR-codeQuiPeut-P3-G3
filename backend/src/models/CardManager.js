const AbstractManager = require("./AbstractManager")

class CardManager extends AbstractManager {
  constructor() {
    super({ table: "card" })
  }

  insert(card) {
    return this.database.query(
      `insert into ${this.table} (jdrName, jdrNameFont, jdrNameColor, jdrNameFontSize, jdrImg1, jdrImg2, jdrText, textColor, textFont, jdrBgColor1, jdrBgColor2, buttonImg, jdrCategory, publicCategory ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        card.jdrName,
        card.jdrNameFont,
        card.jdrNameColor,
        card.jdrNameFontSize,
        card.jdrImg1,
        card.jdrImg2,
        card.jdrText,
        card.textColor,
        card.textFont,
        card.jdrBgColor1,
        card.jdrBgColor2,
        card.buttonImg,
        card.jdrCategory,
        card.publicCategory,
      ]
    )
  }

  update(card) {
    return this.database.query(
      `UPDATE ${this.table} SET jdrName = ?, jdrNameFont = ?, jdrNameColor = ?, jdrNameFontSize = ?, jdrImg1 = ?, jdrImg2 = ?, jdrText = ?, textColor = ?, textFont = ?, jdrBgColor1 = ?,jdrBgColor2 = ?, buttonImg = ?, jdrCategory = ?, publicCategory = ? WHERE (id = ?)`,
      [
        card.jdrName,
        card.jdrNameFont,
        card.jdrNameColor,
        card.jdrNameFontSize,
        card.jdrImg1,
        card.jdrImg2,
        card.jdrText,
        card.textColor,
        card.textFont,
        card.jdrBgColor1,
        card.jdrBgColor2,
        card.buttonImg,
        card.jdrCategory,
        card.publicCategory,
        card.id,
      ]
    )
  }
}

module.exports = CardManager
