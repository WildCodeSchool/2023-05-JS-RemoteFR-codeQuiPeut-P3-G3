/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import ColorSelector from "../../../../../global/texts-editor/ColorSelector"
// import ButtonStandard from "../../../../../global/Buttons/ButtonStandard"
// import iconTextColor from "../../../../../../assets/text_ui/colorPicker.png"

import "./InfoGeneral.scss"
import ButtonUI from "../../../../../global/Buttons/ButtonUI"
import CategorySelector from "../../../../../global/DropLists/CategorySelector"
import PublicSelector from "../../../../../global/DropLists/PublicSelector"
import PopupImgFinder from "../../../../../global/popups/ImageFinderPopup/PopupImgFinder"
import imgDefault from "../../../../../../assets/images/imgIcon.png"
import WidgetText from "../widgets/widgetText"
import { useEditionContext } from "../../../../../../services/contexts/editionContext"

function InfoGeneral() {
  const [jdrName, setJdrName] = useState()
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
  const [buttonColor, setButtonColor] = useState("#0C011C")
  const [buttonFont, setButtonFont] = useState("Arial, sans-serif")
  const [jdrPublic, setJdrPublic] = useState("")
  const [jdrCategory, setJdrCategory] = useState("")
  const [viewEditProperties, setViewEditProperties] = useState(true)
  const [idCard, setIdCard] = useState(null)

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const story = params.get("story")
  const scene = params.get("scene")
  const { editSettings } = useEditionContext()

  // ------------ TEXT FORMATTING -------------------

  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")
  const [selectedSize, setSelectedSize] = useState(16)
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
    textElement.style.color = selectedColor
    setTextFont(selectedFont)
    setTextColor(selectedColor)
  }
  const applyTextFormattingToButtonFont = () => {
    const textElement = document.querySelector(".cardBottomText")
    textElement.style.fontFamily = selectedFont
    setButtonFont(selectedFont)
    setButtonColor(selectedColor)
  }

  // useEffect(() => {
  //   console.log("jdrName change ! ", jdrName)
  //   console.log("jdrNameFont change ! ", jdrNameFont)
  //   console.log("jdrNameColor change ! ", jdrNameColor)
  //   console.log("jdrNameFontSize change ! ", jdrNameFontSize)
  //   console.log("jdrText change ! ", jdrText)
  //   console.log("textFont change ! ", textFont)
  //   console.log("textColor change ! ", textColor)
  // }, [
  //   jdrName,
  //   jdrNameFont,
  //   jdrNameColor,
  //   jdrNameFontSize,
  //   jdrText,
  //   textFont,
  //   textColor,
  // ])

  // --------------- COLOR FORMATTING ------------------

  const [clickedElement, setClickedElement] = useState(null)
  const [displayCPicker, setDisplayCPicker] = useState(false)

  const divCardTop = useRef(null)
  const divCardBottom = useRef(null)
  const divCardButton = useRef(null)

  // const handleColorPicker = () => {
  //   setDisplayCPicker(true)
  // }
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

  const handleButtonBackgroundColorChange = () => {
    setClickedElement("buttonBgButton")
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
    if (clickedElement === "buttonBgButton") {
      divCardButton.current.style.backgroundColor = selectedColor
      updateBackgroundColor(setButtonColor, selectedColor)
    }
  }, [selectedColor])

  // --------------- IMAGE FORMATTING ------------------

  const [selectedPath, setSelectedPath] = useState("")
  const [viewImgFinder, setViewImgFinder] = useState(false)
  const [imgPathBottom, setImgPathBottom] = useState("")
  const [imgPathTop, setImgPathTop] = useState("")

  const [isAddingPic, setIsAddingPic] = useState(false)

  const divImgTop = useRef(null)
  const divImgBottom = useRef(null)

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
    }
  }, [selectedPath])

  const getCard = (storyId) => {
    // console.log("get card id : ", storyId)
    axios
      .get(`http://localhost:4242/card/${storyId}`)
      .then((res) => {
        // console.log("réponse getCard : ", res)
        const values = res.data
        setJdrName(values.jdrName)
        setJdrNameFont(values.jdrNameFont)
        setJdrNameColor(values.jdrNameColor)
        setJdrNameFontSize(values.jdrNameFontSize)
        setJdrImg1(values.jdrImg1)
        setJdrImg2(values.jdrImg2)
        setJdrText(values.jdrText)
        setJdrBgColor1(values.jdrBgColor1)
        setJdrBgColor2(values.jdrBgColor2)
        setButtonFont(values.buttonFont)
        setButtonColor(values.buttonColor)
        setJdrCategory(values.jdrCategory)
        setJdrPublic(values.jdrPublic)
        setJdrNameColor(values.jdrNameColor)
        setTextColor(values.textColor)
        setIdCard(values.idcard)

        // console.log("ID CARD : ", values.idcard)
      })
      .catch((err) => console.error(err))
  }

  // Récupération infos card chargement page
  useEffect(() => {
    editSettings(story, scene)
    getCard(story)
  }, [story, scene])

  // --------------- Connection a la BDD ------------------

  const saveCard = (storyId) => {
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
      buttonFont,
      buttonColor,
      jdrCategory,
      jdrPublic,
    }

    axios
      .put(`http://localhost:4242/card/${storyId}`, cardData)
      .then((res) => {
        if (res.status === 201) {
          alert("carte modifiée avec succes")
        }
      })
      .catch((error) => {
        // console.log(error)
        alert(`erreur : ${error.response.data.error}`)
      })
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
              <label htmlFor="message">Card title :</label>
              <textarea
                id="message"
                name="message"
                rows="3"
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
                rows="5"
                cols="50"
                placeholder="Write a short description here (less than 230 characters)"
                value={jdrText}
                onChange={(e) => setJdrText(e.target.value)}
              ></textarea>
            </div>
            <p className="explainFormatting">
              Click on the text you want to format
            </p>
            <div className="cardGeneralTop">
              <div className="generalConstructorTop">
                <WidgetText
                  viewEditProperties={viewEditProperties}
                  selectedColor={selectedColor}
                  selectedFont={selectedFont}
                  selectedSize={jdrNameFontSize}
                  setSelectedFont={setSelectedFont}
                  setSelectedSize={setJdrNameFontSize}
                  setSelectedColor={setSelectedColor}
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
                  <div className="topBgColorSelector"></div>
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
            <ButtonUI
              title={"save"}
              bgcolor={"#3f7841"}
              onClick={() => saveCard(idCard)}
            />
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
                  onClick={handleButtonBackgroundColorChange}
                  title={"Button Color"}
                  bgcolor={"#0C011C"}
                  className="buttonBgButton"
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
                <div
                  className="cardTopTitle"
                  onChange={(e) => setJdrName(e.target.value)}
                  onClick={applyTextFormattingToJdrName}
                  style={{
                    fontFamily: jdrNameFont,
                    fontSize: `${jdrNameFontSize}px`,
                    color: jdrNameColor,
                  }}
                >
                  {jdrName ? `"${jdrName}"` : "Title Goes Here"}
                </div>
                <img
                  className="cardTopImg"
                  ref={divImgTop}
                  src={
                    imgPathTop
                      ? `http://localhost:4242/uploads/${imgPathTop}`
                      : imgDefault
                  }
                  alt="image top"
                />
              </div>
              <div className="waveAndBottomImg">
                <svg
                  className="wave"
                  xmlns="http://www.w3.org/2000/svg"
                  width="402"
                  height="112"
                  viewBox="0 0 402 112"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M401.198 111.581C401.198 121.174 417.91 -37.4809 298.777 8.32094C0.00046601 101.075 1.93865e-05 101.075 1.93865e-05 100.987L0.000111791 111.581C0.000111791 111.581 84.8331 111.581 133.73 111.581C182.627 111.581 241.782 111.581 290.68 111.581C339.577 111.581 376.933 111.581 401.198 111.581Z"
                    fill={jdrBgColor2}
                  />
                </svg>
                <img
                  className="cardBottomImg"
                  ref={divImgBottom}
                  src={
                    imgPathBottom
                      ? `http://localhost:4242/uploads/${imgPathBottom}`
                      : imgDefault
                  }
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
                  <div
                    className="cardBottomText"
                    onChange={(e) => setJdrText(e.target.value)}
                    onClick={applyTextFormattingToJdrText}
                    style={{
                      fontFamily: textFont,
                      fontSize: `${textFont}px`,
                      color: textColor,
                    }}
                  >
                    {/* <div className="textDescription"> */}
                    {jdrText ? `${jdrText}` : "Description Goes Here"}
                    {/* </div> */}
                  </div>
                  <div
                    className="cardButtonPlay"
                    ref={divCardButton}
                    style={{
                      backgroundColor:
                        clickedElement === ".buttonBgButton"
                          ? buttonColor
                          : "#000000",
                    }}
                  >
                    <h4
                      className="buttonText"
                      ref={divCardButton}
                      onClick={applyTextFormattingToButtonFont}
                      style={{
                        fontFamily: buttonFont,
                        fontSize: `${buttonFont}px`,
                      }}
                    >
                      Play
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoGeneral
