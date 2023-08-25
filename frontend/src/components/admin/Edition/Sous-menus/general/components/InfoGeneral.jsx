import React from "react"

import "./InfoGeneral.scss"
import ButtonUI from "../../../../../global/Buttons/ButtonUI"

function InfoGeneral() {
  return (
    <>
      <div className="infoGeneral">
        <div className="titleInfo">
          <span>Global Information</span>
          <div className="infoGeneralBody">
            <div className="scenes__constructor__resume">
              <label htmlFor="message">Story name :</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="10"
                placeholder="Enter title name"
              ></textarea>
            </div>
            <div className="scenes__constructor__resume">
              <label htmlFor="message">Category :</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="10"
                placeholder="Select category here"
              ></textarea>
            </div>
            <div className="scenes__constructor__resume">
              <label htmlFor="message">Public :</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="10"
                placeholder="Select public here"
              ></textarea>
            </div>
            <div className="scenes__constructor__resume">
              <label htmlFor="message">Description :</label>
              <textarea
                id="message"
                name="message"
                rows="20"
                cols="10"
                placeholder="Write description here"
              ></textarea>
            </div>
          </div>
          <div className="buttonInfo">
            <ButtonUI title={"save"} bgColor={"#3f7841"} />
            <ButtonUI title={"delete"} bgColor={"#902B00"} />
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoGeneral
