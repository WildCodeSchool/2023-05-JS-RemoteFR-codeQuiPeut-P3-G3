const AbstractManager = require("./AbstractManager")

class CardManager extends AbstractManager {
  constructor() {
    super({ table: "card" })
  }

  insert(card) {
    return this.database.query(
      `insert into ${this.table} (jdrGenre, jdrName, jdrNameFont, jdrNameColor, jdrNameFontSize, jdrImg1,  jdrImg2, jdrText, textColor, textFont, jdrBgColor1, jdrBgColor2, buttonColor, buttonFont, ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
        card.buttonColor,
        card.buttonFont,
      ]
    )
  }

  update(card) {
    return this.database.query(
      `UPDATE ${this.table} SET jdrGenre = ?, jdrName = ?, jdrNameFont = ?, jdrNameColor = ?, jdrNameFontSize = ?,  jdrImg1 = ?, jdrImg2 = ?, jdrText = ?, jdrTextColor = ?, jdrTextFont = ?, jdrBgColor1 = ?, jdrBgColor2 = ?, buttonColor = ?, buttonFont = ?,  WHERE (id = ?)`,
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
        card.buttonColor,
        card.buttonFont,
        card.id,
      ]
    )
  }
}

module.exports = CardManager
