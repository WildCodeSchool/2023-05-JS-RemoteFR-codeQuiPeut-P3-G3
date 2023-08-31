import React from "react"

import "./PictureGeneral.scss"
import ButtonUI from "../../../../../global/Buttons/ButtonUI"
import jeuImg from "../../../../../../assets/images/JeuLeDestin.png"
import editPen from "../../../../../../assets/images/EditPen.png"
import FontSelector from "../../../../../global/DropLists/FontSelector"
import FontSize from "../../../../../global/DropLists/FontSize"
import FontType from "../../../../../global/DropLists/FontType"

function PictureGeneral() {
  return (
    <>
      <div className="pictureGeneral">
        <div className="titlePicture">
          <span>PictureGeneral</span>
        </div>
        <div className="jeuImgDiv">
          <img className="jeuImg" src={jeuImg} alt="jeuImg" />
          <img className="editPen" src={editPen} alt="pen" />
        </div>
        <div className="pictureGeneralConstructor">
          <div className="titleArea">
            <div className="titleText">
              <label htmlFor="message">Title</label>
            </div>
            <div className="titleFontFamily">
              <label htmlFor="message">Font-family</label>
              <FontSelector />
            </div>
            <div className="titleFontSize">
              <label htmlFor="message">Font-size</label>
              <FontSize />
            </div>
            <div className="titleFontType">
              <label htmlFor="message">Font-type</label>
              <FontType />
            </div>
            <div className="titleColor">
              <label htmlFor="message">Title Color</label>
            </div>
            <div className="topBgdColor">
              <label htmlFor="message">Top background Color</label>
            </div>
            <div className="topImg">
              <label htmlFor="message">Top Image</label>
            </div>
          </div>
          <div className="pictureGeneralSeparator">
            <div className="verticalLineSeparator"></div>
          </div>

          <div className="selectionArea">
            <div className="descriptionText">
              <label htmlFor="message">Description</label>
            </div>

            <div className="descriptionFontFamily">
              <label htmlFor="message">Font-family</label>
              <FontSelector />
            </div>
            <div className="descriptionFontSize">
              <label htmlFor="message">Font-size</label>
              <FontSize />
            </div>
            <div className="descriptionFontType">
              <label htmlFor="message">Font-type</label>
              <FontType />
            </div>
            <div className="textColor">
              <label htmlFor="message">Text Color</label>
            </div>
            <div className="bottomBgdColor">
              <label htmlFor="message">Bottom background Color</label>
            </div>
            <div className="bottomImg">
              <label htmlFor="message">Bottom Image</label>
            </div>
          </div>
        </div>
        <div className="buttonSelector">
          <div className="buttonImg">
            <label htmlFor="message">Button Image</label>
          </div>
          <div className="buttonTextFont">
            <label htmlFor="message">Button Text Font</label>
            <FontSelector />
          </div>
          <div className="buttonTextColor">
            <label htmlFor="message">Button Text Color</label>
          </div>
        </div>
        <div className="buttonPictureGeneral">
          <ButtonUI title={"save"} bgcolor={"#3f7841"} />
          <ButtonUI title={"delete"} bgcolor={"#902B00"} />
        </div>
      </div>
    </>
  )
}

export default PictureGeneral
