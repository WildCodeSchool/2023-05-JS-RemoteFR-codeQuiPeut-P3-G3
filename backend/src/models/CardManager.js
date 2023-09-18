const AbstractManager = require("./AbstractManager")

class CardManager extends AbstractManager {
  constructor() {
    super({ table: "card" })
  }

  insert(card) {
    return this.database.query(
      `insert into ${this.table} (jdrName, jdrNameFont, jdrNameColor, jdrNameFontSize, jdrImg1, jdrImg2, jdrText, textColor, textFont, jdrBgColor1, jdrBgColor2, buttonImg, jdrCategory, jdrPublic ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        card.jdrGenre,
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
        card.jdrPublic,
      ]
    )
  }

  update(card) {
    return this.database.query(
      `UPDATE ${this.table} SET jdrName = ?, jdrNameFont = ?, jdrNameColor = ?, jdrNameFontSize = ?, jdrImg1 = ?, jdrImg2 = ?, jdrText = ?, textColor = ?, textFont = ?, jdrBgColor1 = ?, jdrBgColor2 = ?, buttonImg = ?, jdrCategory = ?, jdrPublic = ? WHERE (id = ?)`,
      [
        card.jdrGenre,
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
        card.jdrPublic,
        card.id,
      ]
    )
  }
}

module.exports = CardManager
