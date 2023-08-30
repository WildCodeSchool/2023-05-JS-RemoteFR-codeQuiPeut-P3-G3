import { useRef, useState, useEffect } from "react"

import "./EditScenes.scss"
import WidgetProperties from "./properties/widgetProperties"
import WidgetScenes from "./scenes/widgetScenes"
import WidgetToolbar from "./constructor/toolbar/WidgetToolbar"
import ButtonUI from "../../../../global/Buttons/ButtonUI"
import ContainerCanva from "./constructor/canva/ContainerCanva"
import PopupImgFinder from "../../../../global/popups/ImageFinderPopup/PopupImgFinder"

function EditScenes() {
  const canvasRef = useRef(null)
  const [isAddingText, setIsAddingText] = useState(false)
  const [isAddingPic, setIsAddingPic] = useState(false)
  const [isAddingBackground, setIsAddingBackground] = useState(false)
  const [viewEditProperties, setViewProperties] = useState(false)

  /* RECUPERATION DES PROPRIETES */
  const [selectedColor, setSelectedColor] = useState("#FF0000")

  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")

  const [selectedSize, setSelectedSize] = useState(16)

  const [selectedAlignment, setAlignment] = useState("text-align: center")

  /* Popup image viewer */
  const [selectedPath, setSelectedPath] = useState("")
  const [viewImgFinder, setViewImgFinder] = useState(false)
  const [imgPath, setImgPath] = useState("")
  const [backgroundPath, setBackgroundPath] = useState("")
  console.info(backgroundPath)

  /* Actions quand quitte la popup */
  useEffect(() => {
    if (!viewImgFinder) {
      setIsAddingPic(false)
      setIsAddingBackground(false)
      setImgPath("")
      setBackgroundPath("")
      setSelectedPath("")
    }
  }, [viewImgFinder])

  /* Actions quand selection d'une image */
  useEffect(() => {
    if (isAddingPic || isAddingBackground) {
      setViewImgFinder(true)
    }

    if (isAddingPic && selectedPath) {
      setImgPath(selectedPath)
    }

    if (isAddingBackground && selectedPath) {
      setBackgroundPath(selectedPath)
    }
  }, [isAddingPic, isAddingBackground, isAddingText, selectedPath])

  return (
    <>
      <div className="scenes">
        <div className="scenes__scenes">
          <WidgetScenes />
        </div>
        <div className="scenes__constructor">
          <div className="scenes__constructor__resume">
            <label htmlFor="message">Description scene :</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              cols="50"
              placeholder="Enter resume scene"
            ></textarea>
          </div>
          <div className="scenes__constructor__toolbar">
            <WidgetToolbar
              isAddingText={isAddingText}
              setIsAddingText={setIsAddingText}
              isAddingBackground={isAddingBackground}
              setIsAddingBackground={setIsAddingBackground}
              isAddingPic={isAddingPic}
              setIsAddingPic={setIsAddingPic}
            />
          </div>
          <div ref={canvasRef} className="scenes__constructor__canva">
            <ContainerCanva
              canvasRef={canvasRef}
              isAddingText={isAddingText}
              setIsAddingText={setIsAddingText}
              isAddingPic={isAddingPic}
              setIsAddingPic={setIsAddingPic}
              isAddingBackground={isAddingBackground}
              setIsAddingBackground={setIsAddingBackground}
              setViewProperties={setViewProperties}
              viewEditProperties={viewEditProperties}
              selectedColor={selectedColor}
              selectedFont={selectedFont}
              selectedSize={selectedSize}
              selectedAlignment={selectedAlignment}
              setSelectedSize={setSelectedSize}
              backgroundPath={selectedPath}
              imgPath={imgPath}
            />
            {/* <CanvasWithText /> */}
          </div>
          <div className="scenes__constructor__btn">
            <ButtonUI title={"save"} bgcolor={"#3f7841"} />
            <ButtonUI title={"reset"} bgcolor={"#0A0A0A"} />
            <ButtonUI title={"delete"} bgcolor={"#902B00"} />
          </div>
        </div>
        <div className="scenes__properties">
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
      {/* Popup recherche image */}
      {viewImgFinder && (
        <PopupImgFinder
          setViewImgFinder={setViewImgFinder}
          setSelectedPath={setSelectedPath}
          selectedPath={selectedPath}
        />
      )}
    </>
  )
}

export default EditScenes
