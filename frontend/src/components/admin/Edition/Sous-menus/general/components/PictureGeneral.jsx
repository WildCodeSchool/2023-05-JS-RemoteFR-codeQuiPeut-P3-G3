import React from "react"

import "./PictureGeneral.scss"
import ButtonUI from "../../../../../global/Buttons/ButtonUI"
import jeuImg from "../../../../../../assets/images/JeuLeDestin.png"
import editPen from "../../../../../../assets/images/EditPen.png"

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
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="20"
                placeholder="Font-family"
              ></textarea>
            </div>
            <div className="titleFontSize">
              <label htmlFor="message">Font-size</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="20"
                placeholder="Font-size"
              ></textarea>
            </div>
            <div className="titleFontType">
              <label htmlFor="message">Font-type</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="20"
                placeholder="Font-type"
              ></textarea>
            </div>
          </div>
          {/* <div className="pictureGeneralSeparator"></div> */}
          <div className="selectionArea">
            <div className="descriptionText">
              <label htmlFor="message">Description</label>
            </div>

            <div className="descriptionFontFamily">
              <label htmlFor="message">Font-family</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="20"
                placeholder="Font-family"
              ></textarea>
            </div>
            <div className="descriptionFontSize">
              <label htmlFor="message">Font-size</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="20"
                placeholder="Font-size"
              ></textarea>
            </div>
            <div className="descriptionFontType">
              <label htmlFor="message">Font-type</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="20"
                placeholder="Font-type"
              ></textarea>
            </div>
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
