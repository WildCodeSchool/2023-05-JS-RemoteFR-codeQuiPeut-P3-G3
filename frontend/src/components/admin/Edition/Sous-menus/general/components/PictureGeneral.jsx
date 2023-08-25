import React from "react"

import "./PictureGeneral.scss"
import ButtonUI from "../../../../../global/ButtonUI"

function PictureGeneral() {
  return (
    <>
      <div className="pictureGeneral">
        <div className="titlePicture">
          <span>PictureGeneral</span>
        </div>
        <div className="jeuImgDiv">
          <img
            className="jeuImg"
            src="../../../../../../assets/images/JeuLeDestin.png"
            alt="jeuImg"
          />
          <img
            className="editPen"
            src="../../../../../../assets/images/EditPen.png"
            alt="pen"
          />
        </div>
        <div className="buttonPictureGeneral">
          <ButtonUI title={"save"} bgColor={"#3f7841"} />
          <ButtonUI title={"delete"} bgColor={"#902B00"} />
        </div>
      </div>
    </>
  )
}

export default PictureGeneral
