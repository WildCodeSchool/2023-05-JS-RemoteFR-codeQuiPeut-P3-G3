const AbstractManager = require("./AbstractManager")

class CardManager extends AbstractManager {
  constructor() {
    super({ table: "card" })
  }

  findCard(cardId) {
    return this.database.query(
      `SELECT ${this.table}.*
       FROM ${this.table}
       INNER JOIN stories ON ${this.table}.idcard = stories.card_idcard
       WHERE stories.id = ?`,
      [cardId]
    )
  }

  insert(card) {
    return this.database.query(
      `insert into ${this.table} (jdrName, jdrNameFont, jdrNameColor, jdrNameFontSize, jdrImg1, jdrImg2, jdrText, textColor, textFont, jdrBgColor1, jdrBgColor2, buttonColor, buttonFont, jdrCategory, jdrPublic, storyId ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
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
        card.buttonColor,
        card.buttonFont,
        card.jdrCategory,
        card.jdrPublic,
        card.storyId,
      ]
    )
  }

  update(card) {
    // console.log("update")
    return this.database.query(
      `UPDATE ${this.table} SET jdrName = ?, jdrNameFont = ?, jdrNameColor = ?, jdrNameFontSize = ?, jdrImg1 = ?, jdrImg2 = ?, jdrText = ?, textColor = ?, textFont = ?, jdrBgColor1 = ?, jdrBgColor2 = ?, buttonColor = ?, buttonFont = ?, jdrCategory = ?, jdrPublic = ? WHERE (idcard = ?)`,

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
        card.buttonColor,
        card.buttonFont,
        card.jdrCategory,
        card.jdrPublic,
        card.id,
      ]
    )
  }
}

module.exports = CardManager
