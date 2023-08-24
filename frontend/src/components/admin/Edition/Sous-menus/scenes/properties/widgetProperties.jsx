import React, { useState } from "react"
import "./widgetProperties.scss"
import TextProperties from "./text-editor/textProperties"
import FontSelector from "../../../../../global/DropLists/FontSelector"
import FontSize from "../../../../../global/DropLists/FontSize"
import ColorSelector from "./text-editor/ColorSelector"
import iconTextColor from "../../../../../../assets/text_ui/colorPicker.png"
import ButtonStandard from "../../../../../global/Buttons/ButtonStandard"

function WidgetProperties({ viewEditProperties }) {
  const [displayCPicker, setDisplayCPicker] = useState(false)

  const handleColorPicker = () => {
    setDisplayCPicker(true)
  }

  const handleCloseColorPicker = (color) => {
    setDisplayCPicker(false)
    setSelectedColor(color)
  }

  /* RECUPERATION DES PROPRIETES */
  const [selectedColor, setSelectedColor] = useState("#FF0000")

  const [selectedFont, setSelectedFont] = useState({
    value: "Arial, sans-serif",
    label: "Arial",
  })

  const [selectedSize, setSelectedSize] = useState({
    value: "16px",
    label: "16px",
  })

  const [selectedAlignment, setAlignment] = useState("text-align: center")

  /* JSX */
  return (
    <div>
      <div className="title-properties">
        <span>Properties</span>
      </div>
      {viewEditProperties ? (
        <div className="fontProps__content">
          <span> Font family</span>
          <div className="fontProps__familySelect">
            <FontSelector
              setSelectedFont={setSelectedFont}
              selectedFont={selectedFont}
            />
            <FontSize
              setSelectedSize={setSelectedSize}
              selectedSize={selectedSize}
            />
            <ButtonStandard img={iconTextColor} onClick={handleColorPicker} />
            <ColorSelector
              state={displayCPicker}
              onClose={handleCloseColorPicker}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>
          <TextProperties
            selectedAlignment={selectedAlignment}
            setAlignment={setAlignment}
          />
        </div>
      ) : (
        <p style={{ color: "black" }}>test</p>
      )}
    </div>
  )
}

export default WidgetProperties
