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
            <div className="storyName">
              <label htmlFor="message">Story title :</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="20"
                placeholder="Enter title name"
              ></textarea>
            </div>
            <div className="storyCategory">
              <label htmlFor="message">Category :</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="20"
                placeholder="Select category here"
              ></textarea>
            </div>
            <div className="storyPublic">
              <label htmlFor="message">Public :</label>
              <textarea
                id="message"
                name="message"
                rows="1"
                cols="20"
                placeholder="Select public here"
              ></textarea>
            </div>
            <div className="storyDescription">
              <label htmlFor="message">Description :</label>
              <textarea
                id="message"
                name="message"
                rows="30"
                cols="50"
                placeholder="Write description here"
              ></textarea>
            </div>
            {/* <div className="scenes__constructor__resume">
              <label htmlFor="message">Description :</label>
              <textarea
                id="message"
                name="message"
                rows="20"
                cols="10"
                placeholder="Write description here"
              ></textarea>
            </div> */}
          </div>
          <div className="buttonInfo">
            <ButtonUI title={"save"} bgcolor={"#3f7841"} />
            <ButtonUI title={"delete"} bgcolor={"#902B00"} />
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoGeneral
