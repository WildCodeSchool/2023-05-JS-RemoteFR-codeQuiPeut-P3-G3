import React, { useState } from "react"
import axios from "axios"

import "./InfoGeneral.scss"
import ButtonUI from "../../../../../global/Buttons/ButtonUI"
import CategorySelector from "../../../../../global/DropLists/CategorySelector"
import PublicSelector from "../../../../../global/DropLists/PublicSelector"
import WidgetProperties from "../../scenes/properties/widgetProperties"

function InfoGeneral() {
  const [jdrName, setJdrName] = useState("")
  const [jdrCategory, setJdrCategory] = useState("")
  const [jdrPublic, setJdrPublic] = useState("")
  const [jdrText, setJdrText] = useState("")

  const [viewEditProperties, setViewProperties] = useState(true)
  console.info(setViewProperties)

  const [selectedColor, setSelectedColor] = useState("#FF0000")

  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")

  const [selectedSize, setSelectedSize] = useState(16)

  const [selectedAlignment, setAlignment] = useState("text-align: center")

  const saveStory = () => {
    const storyData = { jdrName, jdrCategory, jdrPublic, jdrText }
    axios.post("http://localhost:4242/stories", storyData)
  }

  return (
    <>
      <div className="infoGeneral">
        <div className="titleInfo">
          <span>Card Edition</span>
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
            <CategorySelector
              selectedCategory={jdrCategory}
              setSelectedCategory={setJdrCategory}
            />
          </div>
          <div className="storyPublic">
            <label htmlFor="message">Public :</label>
            <PublicSelector
              selectedPublic={jdrPublic}
              setSelectedPublic={setJdrPublic}
            />
          </div>
          <div className="storyDescription">
            <label htmlFor="message">Description :</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              cols="50"
              placeholder="Write a short description here (less than 230 characters)"
              value={jdrText}
              onChange={(e) => setJdrText(e.target.value)}
            ></textarea>
          </div>
          <div className="generalConstructor">
            <WidgetProperties
              viewEditProperties={viewEditProperties}
              selectedColor={selectedColor}
              selectedFont={selectedFont}
              selectedSize={selectedSize}
              selectedAlignment={selectedAlignment}
              setSelectedColor={setSelectedColor}
              setSelectedFont={setSelectedFont}
              setSelectedSize={setSelectedSize}
              setAlignment={setAlignment}
            />
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
