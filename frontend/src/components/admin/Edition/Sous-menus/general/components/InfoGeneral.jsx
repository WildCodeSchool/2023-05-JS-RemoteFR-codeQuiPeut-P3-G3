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
import PopupImgFinder from "../../../../../global/popups/ImageFinderPopup/PopupImgFinder"

function InfoGeneral() {
  const [jdrName, setJdrName] = useState(null)
  const [jdrNameFont, setJdrNameFont] = useState("Arial, sans-serif")
  const [jdrNameColor, setJdrNameColor] = useState("#FFFFFF")
  const [jdrNameFontSize, setJdrNameFontSize] = useState(16)
  const [jdrImg1, setJdrImg1] = useState("")
  const [jdrImg2, setJdrImg2] = useState("")
  const [jdrText, setJdrText] = useState("")
  const [textColor, setTextColor] = useState("#FF0000")
  const [textFont, setTextFont] = useState("Arial, sans-serif")
  const [jdrBgColor1, setJdrBgColor1] = useState("#0C011C")
  const [jdrBgColor2, setJdrBgColor2] = useState("#F8C86B")
  const [buttonImg, setButtonImg] = useState("")
  const [jdrPublic, setJdrPublic] = useState("")
  const [jdrCategory, setJdrCategory] = useState("")
  const [viewEditProperties, setViewEditProperties] = useState(true)

  // ------------ TEXT FORMATTING -------------------

  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")
  const [selectedSize, setSelectedSize] = useState(32)
  const [selectedColor, setSelectedColor] = useState("#FFFFFF")

  const applyTextFormattingToJdrName = () => {
    const textElement = document.querySelector(".cardTopTitle")
    textElement.style.fontFamily = selectedFont
    textElement.style.fontSize = `${selectedSize}px`
    textElement.style.color = selectedColor
    setJdrNameFont(selectedFont)
    setJdrNameColor(selectedColor)
    setJdrNameFontSize(selectedSize)
  }

  const applyTextFormattingToJdrText = () => {
    const textElement = document.querySelector(".cardBottomText")
    textElement.style.fontFamily = selectedFont
    textElement.style.fontSize = `${selectedSize}px`
    textElement.style.color = selectedColor
    setTextFont(selectedFont)
    setTextColor(selectedColor)
  }
  useEffect(() => {
    // console.log("jdrName change ! ", jdrName)
    // console.log("jdrNameFont change ! ", jdrNameFont)
    // console.log("jdrNameColor change ! ", jdrNameColor)
    // console.log("jdrNameFontSize change ! ", jdrNameFontSize)
    // console.log("jdrText change ! ", jdrText)
    // console.log("textFont change ! ", textFont)
    // console.log("textColor change ! ", textColor)
  }, [
    jdrName,
    jdrNameFont,
    jdrNameColor,
    jdrNameFontSize,
    jdrText,
    textFont,
    textColor,
  ])

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
    setSelectedColor(color)
  }

  const updateBackgroundColor = (colorSetter, colorState) => {
    colorSetter(colorState)
  }

  const handleTopBackgroundColorChange = () => {
    setClickedElement("buttonBgTop")
    setDisplayCPicker(true)
  }

  const handleBottomBackgroundColorChange = () => {
    setClickedElement("buttonBgBottom")
    setDisplayCPicker(true)
  }

  useEffect(() => {
    if (clickedElement === "buttonBgTop") {
      divCardTop.current.style.backgroundColor = selectedColor
      updateBackgroundColor(setJdrBgColor1, selectedColor)
    }
    if (clickedElement === "buttonBgBottom") {
      divCardBottom.current.style.backgroundColor = selectedColor
      updateBackgroundColor(setJdrBgColor2, selectedColor)
    }
  }, [selectedColor])

  // --------------- IMAGE FORMATTING ------------------

  const [selectedPath, setSelectedPath] = useState("")
  const [viewImgFinder, setViewImgFinder] = useState(false)
  const [imgPathBottom, setImgPathBottom] = useState("")
  const [imgPathTop, setImgPathTop] = useState("")
  const [imgPathButton, setImgPathButton] = useState("")

  const [isAddingPic, setIsAddingPic] = useState(false)

  const divImgTop = useRef(null)
  const divImgBottom = useRef(null)
  const divImgButton = useRef(null)

  const handleImg = (className) => {
    setIsAddingPic(true)
    setClickedElement(className)
    setViewImgFinder(true)
  }

  useEffect(() => {
    if (isAddingPic) {
      setViewImgFinder(true)
    }
  }, [isAddingPic, selectedPath])

  useEffect(() => {
    if (selectedPath !== null || selectedPath !== "") {
      if (clickedElement === "buttonImgBottom") {
        setImgPathBottom(selectedPath)
        setJdrImg2(selectedPath)
      }

      if (clickedElement === "buttonImgTop") {
        setImgPathTop(selectedPath)
        setJdrImg1(selectedPath)
      }

      if (clickedElement === "buttonImgButton") {
        setImgPathButton(selectedPath)
        setButtonImg(selectedPath)
      }
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
                  selectedSize={jdrNameFontSize}
                  setSelectedColor={setSelectedColor}
                  setSelectedFont={setSelectedFont}
                  setSelectedSize={setJdrNameFontSize}
                />
              </div>
              <div className="topRight">
                <div className="topImg">
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
            <div className="selectionButtons">
              <div className="topButtons">
                <ButtonUI
                  onClick={handleTopBackgroundColorChange}
                  title={"Top Color"}
                  bgcolor={"#0C011C"}
                  className="buttonBgTop"
                />
                <ButtonUI
                  onClick={() => handleImg("buttonImgTop")}
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
                  onClick={() => handleImg("buttonImgBottom")}
                  title={"Bottom Image"}
                  bgcolor={"#0C011C"}
                  className="buttonImgBottom"
                />
                <ButtonUI
                  onClick={() => handleImg("buttonImgButton")}
                  title={"Button Image"}
                  bgcolor={"#0C011C"}
                  className="buttonImgButton"
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
                  src={`http://localhost:4242/uploads/${imgPathTop}`}
                  alt="image top"
                />
              </div>
              <div className="waveAndBottomImg">
                <svg
                  className="wave"
                  xmlns="http://www.w3.org/2000/svg"
                  width="399"
                  height="102"
                  viewBox="0 0 399 102"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M399 102C389.707 102 410.965 -36.5042 293.813 9.28055C0.000394461 102 5.88955e-06 102 5.88955e-06 101.912V102C5.88955e-06 102 82.3405 102 130.425 102C178.51 102 237.197 102 285.282 102C333.367 102 375.138 102 399 102Z"
                    fill={jdrBgColor2}
                  />
                </svg>
                <img
                  className="cardBottomImg"
                  ref={divImgBottom}
                  src={`http://localhost:4242/uploads/${imgPathBottom}`}
                  alt="image bottom"
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
                  <div className="cardButtonPlay">
                    <img
                      className="cardButtonImg"
                      ref={divImgButton}
                      src={`http://localhost:4242/uploads/${imgPathButton}`}
                      alt="image button"
                    />
                    <h4 className="buttonText">Play</h4>
                  </div>
                  {/* </button> */}
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
