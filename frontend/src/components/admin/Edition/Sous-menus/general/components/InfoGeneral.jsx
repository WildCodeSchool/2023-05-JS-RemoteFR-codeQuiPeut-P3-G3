/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import ColorSelector from "../../../../../global/texts-editor/ColorSelector"
import ButtonStandard from "../../../../../global/Buttons/ButtonStandard"
import iconTextColor from "../../../../../../assets/text_ui/colorPicker.png"

import "./InfoGeneral.scss"
import ButtonUI from "../../../../../global/Buttons/ButtonUI"
import CategorySelector from "../../../../../global/DropLists/CategorySelector"
import PublicSelector from "../../../../../global/DropLists/PublicSelector"
import WidgetProperties from "../../scenes/properties/widgetProperties"
import editPen from "../../../../../../assets/images/EditPen.png"
import imgPerson from "../../../../../../assets/user_ui/person.png"
import PopupImgFinder from "../../../../../global/popups/ImageFinderPopup/PopupImgFinder"

function InfoGeneral() {
  const [jdrName, setJdrName] = useState(null)
  const [jdrNameFont, setJdrNameFont] = useState("Arial, sans-serif")
  const [jdrNameColor, setJdrNameColor] = useState("#FFF")
  const [jdrNameFontSize, setJdrNameFontSize] = useState(16)
  const [jdrImg1, setJdrImg1] = useState("")
  const [jdrImg2, setJdrImg2] = useState("")
  const [jdrText, setJdrText] = useState("")
  const [textColor, setTextColor] = useState("#FF0000")
  const [textFont, setTextFont] = useState("Arial, sans-serif")
  const [jdrBgColor1, setJdrBgColor1] = useState("#44114D")
  const [jdrBgColor2, setJdrBgColor2] = useState("#F8C86B")
  const [buttonImg, setButtonImg] = useState("")
  const [jdrPublic, setJdrPublic] = useState("")
  const [jdrCategory, setJdrCategory] = useState("")
  const [viewEditProperties, setViewProperties] = useState(true)

  // ------------ TEXT FORMATTING -------------------

  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")
  const [selectedSize, setSelectedSize] = useState(16)
  const [selectedColor, setSelectedColor] = useState("#FF0000")

  const applyTextFormattingToJdrName = () => {
    const textElement = document.querySelector(".cardTopTitle")
    textElement.style.fontFamily = selectedFont
    textElement.style.fontSize = `${selectedSize}px`
    textElement.style.color = selectedColor
  }

  const applyTextFormattingToJdrText = () => {
    const textElement = document.querySelector(".cardBottomText")
    textElement.style.fontFamily = selectedFont
    textElement.style.fontSize = `${selectedSize}px`
    textElement.style.color = selectedColor
  }

  // --------------- COLOR FORMATTING ------------------

  const [clickedElement, setClickedElement] = useState(null)
  const [displayCPicker, setDisplayCPicker] = useState(false)

  const divCardTop = useRef(null)
  const divCardBottom = useRef(null)

  const handleColorPicker = () => {
    setDisplayCPicker(true)
  }
  const handleCloseColorPicker = (color) => {
    setDisplayCPicker(false)
    selectedColor(color)
  }

  const updateBackgroundColor = (
    colorSetter,
    colorState,
    colorPickerSetter
  ) => {
    colorPickerSetter(true)
    colorSetter(colorState)
  }

  const handleTopBackgroundColorChange = () => {
    setClickedElement("buttonBgTop")
    updateBackgroundColor(setJdrBgColor1, jdrBgColor1, setDisplayCPicker)
  }

  const handleBottomBackgroundColorChange = () => {
    setClickedElement("buttonBgBottom")
    updateBackgroundColor(setJdrBgColor2, jdrBgColor2, setDisplayCPicker)
  }

  useEffect(() => {
    if (clickedElement === "buttonBgTop") {
      divCardTop.current.style.backgroundColor = selectedColor
    }
    if (clickedElement === "buttonBgBottom") {
      divCardBottom.current.style.backgroundColor = selectedColor
    }
  }, [selectedColor])

  // --------------- IMAGE FORMATTING ------------------

  const [selectedPath, setSelectedPath] = useState("")
  const [viewImgFinder, setViewImgFinder] = useState(false)
  const [imgPath, setImgPath] = useState("")
  const [isAddingPic, setIsAddingPic] = useState(false)

  const divImgTop = useRef(null)
  const divImgBottom = useRef(null)

  const handleTopImg = () => {
    setClickedElement("buttonImgTop")
    setViewImgFinder(true)
  }

  const handleBottomImg = () => {
    setClickedElement("buttonImgBottom")
    setViewImgFinder(true)
  }

  useEffect(() => {
    if (isAddingPic) {
      setViewImgFinder(true)
    }
    if (isAddingPic && selectedPath) {
      setImgPath(selectedPath)
    }
  }, [isAddingPic, selectedPath])

  useEffect(() => {
    if (selectedPath !== null || selectedPath !== "") {
      setImgPath(selectedPath)
    }
  }, [selectedPath])

  useEffect(() => {
    if (clickedElement === "buttonImgTop") {
      divImgTop.current.src = selectedPath
    }
    if (clickedElement === "buttonImgBottom") {
      divImgBottom.current.src = selectedPath
    }
  }, [selectedPath])

  // --------------- Connection a la BDD ------------------

  const saveCard = () => {
    const cardData = {
      jdrName,
      jdrNameFont,
      jdrNameColor,
      jdrNameFontSize,
      jdrImg1,
      jdrImg2,
      jdrText,
      textColor,
      textFont,
      jdrBgColor1,
      jdrBgColor2,
      buttonImg,
      jdrCategory,
      jdrPublic,
    }
    axios.post("http://localhost:4242/card", cardData)
  }

  return (
    <>
      <div className="cardGeneral">
        <div className="infoGeneral">
          <div className="titleInfo">
            <span>Card Edition</span>
          </div>
          <div className="infoGeneralBody">
            <div className="storyCategorySelction">
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
            </div>
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
            <div className="storyDescription">
              <label htmlFor="message">Description :</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                cols="50"
                placeholder="Write a short description here (less than 230 characters)"
                value={jdrText}
                onChange={(e) => setJdrText(e.target.value)}
              ></textarea>
            </div>
            <div className="cardGeneralTop">
              <div className="generalConstructorTop">
                <WidgetProperties
                  viewEditProperties={viewEditProperties}
                  selectedColor={selectedColor}
                  selectedFont={selectedFont}
                  selectedSize={selectedSize}
                  setSelectedColor={setSelectedColor}
                  setSelectedFont={setSelectedFont}
                  setSelectedSize={setSelectedSize}
                />
              </div>
              <div className="topRight">
                <div className="topImg">
                  <span>Pick an Image</span>
                  <button
                    className={`btn-toolbar ${
                      isAddingPic ? "active" : "inactive"
                    }`}
                    type="button"
                    onClick={() => setIsAddingPic(true)}
                  >
                    <img src={imgPerson} alt="icon-person" />
                  </button>
                  {viewImgFinder && (
                    <PopupImgFinder
                      setViewImgFinder={setViewImgFinder}
                      setSelectedPath={setSelectedPath}
                      selectedPath={selectedPath}
                    />
                  )}
                </div>
                <div className="topBgColor">
                  {/* <span>Pick a Background Color</span> */}
                  <div className="topBgColorSelector"></div>
                  <ButtonStandard
                    img={iconTextColor}
                    onClick={handleColorPicker}
                  />
                  <ColorSelector
                    state={displayCPicker}
                    onClose={handleCloseColorPicker}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="buttonInfo">
            <ButtonUI title={"save"} bgcolor={"#3f7841"} onClick={saveCard} />
            <ButtonUI title={"delete"} bgcolor={"#902B00"} />
          </div>
        </div>

        {/* -------------- VUE DU RESULTAT COTE CARD --------------- */}

        <div className="pictureGeneral">
          <div className="pictureAndPen">
            <div className="bgColorButtons">
              <div className="topButtons">
                <ButtonUI
                  onClick={handleTopBackgroundColorChange}
                  title={"Top Color"}
                  bgcolor={"#0C011C"}
                  className="buttonBgTop"
                />
                <ButtonUI
                  onClick={handleTopImg}
                  title={"Top Image"}
                  bgcolor={"#0C011C"}
                  className="buttonImgTop"
                />
              </div>
              <div className="bottomButtons">
                <ButtonUI
                  onClick={handleBottomBackgroundColorChange}
                  title={"Bottom Color"}
                  bgcolor={"#0C011C"}
                  className="buttonBgBottom"
                />
                <ButtonUI
                  onClick={handleBottomImg}
                  title={"Bottom Image"}
                  bgcolor={"#0C011C"}
                  className="buttonImgBottom"
                />
              </div>
            </div>
            <div className="pictureMain">
              <div
                className="cardTop"
                ref={divCardTop}
                style={{
                  backgroundColor:
                    clickedElement === ".buttonBgTop" ? jdrBgColor1 : "",
                }}
              >
                <input
                  className="cardTopTitle"
                  type="text"
                  value={jdrName && `"${jdrName}"`}
                  placeholder="Title Goes Here"
                  onChange={(e) => setJdrName(e.target.value)}
                  onClick={applyTextFormattingToJdrName}
                  style={{
                    fontFamily: jdrNameFont,
                    fontSize: `${jdrNameFontSize}px`,
                    color: jdrNameColor,
                  }}
                />
                <img
                  className="cardTopImg"
                  ref={divImgTop}
                  src={`http://localhost:4242/uploads/${imgPath}`}
                  alt="image top"
                />
              </div>
              <div
                className="cardBottom"
                ref={divCardBottom}
                style={{
                  backgroundColor:
                    clickedElement === ".buttonBgBottom" ? jdrBgColor2 : "",
                }}
              >
                <img
                  className="cardBottomImg"
                  ref={divImgBottom}
                  src={`http://localhost:4242/uploads/${imgPath}`}
                  alt="image bottom"
                />
                <div className="cardBottomTextButton">
                  <input
                    className="cardBottomText"
                    type="text"
                    value={jdrText}
                    placeholder="Description Goes here"
                    onChange={(e) => setJdrText(e.target.value)}
                    onClick={applyTextFormattingToJdrText}
                    style={{
                      fontFamily: textFont,
                      fontSize: `${textFont}px`,
                      color: textColor,
                    }}
                  />
                  <button type="button" className="cardBottomButton">
                    Play
                  </button>
                </div>
              </div>
            </div>
            {/* <img className="editPen" src={editPen} alt="pen" /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoGeneral
