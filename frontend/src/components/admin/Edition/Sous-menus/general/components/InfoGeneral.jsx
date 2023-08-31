import React, { useState } from "react"
import axios from "axios"

import "./InfoGeneral.scss"
import ButtonUI from "../../../../../global/Buttons/ButtonUI"
import CategorySelector from "../../../../../global/DropLists/CategorySelector"
import PublicSelector from "../../../../../global/DropLists/PublicSelector"

function InfoGeneral() {
  const [jdrName, setJdrName] = useState("")
  // const [jdrNameFont, setJdrNameFont] = useState("")
  const saveStory = async () => {
    try {
      await axios.post("/stories", { jdrName })
    } catch (err) {
      console.error(err).sendStatus(500)
    }
  }
  return (
    <>
      <div className="infoGeneral">
        <div className="titleInfo">
          <span>Global Information</span>
        </div>
        <div className="infoGeneralBody">
          <div className="storyName">
            <label htmlFor="message">Story title :</label>
            <textarea
              id="message"
              name="message"
              rows="1"
              cols="20"
              placeholder="Enter title name"
              value={jdrName}
              onChange={(e) => setJdrName(e.target.value)}
            ></textarea>
          </div>
          <div className="storyCategory">
            <label htmlFor="message">Category :</label>
            <div className="jdrCategory">
              <CategorySelector />
            </div>
          </div>
          <div className="storyPublic">
            <label htmlFor="message">Public :</label>
            <div className="publicSelector">
              <PublicSelector />
            </div>
          </div>
          <div className="storyDescription">
            <label htmlFor="message">Description :</label>
            <textarea
              id="message"
              name="message"
              rows="25"
              cols="50"
              placeholder="Write a short description here (less than 230 characters)"
            ></textarea>
          </div>
        </div>
        <div className="buttonInfo">
          <ButtonUI title={"save"} bgcolor={"#3f7841"} onClick={saveStory} />
          <ButtonUI title={"delete"} bgcolor={"#902B00"} />
        </div>
      </div>
    </>
  )
}

export default InfoGeneral
