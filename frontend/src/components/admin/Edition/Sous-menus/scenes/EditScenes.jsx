import { useRef, useState } from "react"

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
  const [viewEditProperties, setViewProperties] = useState(false)

  /* RECUPERATION DES PROPRIETES */
  const [selectedColor, setSelectedColor] = useState("#FF0000")

  const [selectedFont, setSelectedFont] = useState("Arial, sans-serif")

  const [selectedSize, setSelectedSize] = useState(16)

  const [selectedAlignment, setAlignment] = useState("text-align: center")

  /* Popup image viewer */
  const [selectedPath, setSelectedPath] = useState("")
  const [viewImgFinder, setViewImgFinder] = useState(false)

  const handleAddTextButtonClick = () => {
    setIsAddingText(!isAddingText)
  }

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
              onAddText={handleAddTextButtonClick}
              setViewImgFinder={setViewImgFinder}
              isAddingText={isAddingText}
            />
          </div>
          <div ref={canvasRef} className="scenes__constructor__canva">
            <ContainerCanva
              canvasRef={canvasRef}
              isAddingText={isAddingText}
              setIsAddingText={setIsAddingText}
              setViewProperties={setViewProperties}
              viewEditProperties={viewEditProperties}
              selectedColor={selectedColor}
              selectedFont={selectedFont}
              selectedSize={selectedSize}
              selectedAlignment={selectedAlignment}
              setSelectedSize={setSelectedSize}
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
