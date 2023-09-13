import React, { useState } from "react"
import "./widgetProperties.scss"
import TextProperties from "../../../../../global/texts-editor/textProperties"
import FontSelector from "../../../../../global/DropLists/FontSelector"
import FontSize from "../../../../../global/DropLists/FontSize"
import ColorSelector from "../../../../../global/texts-editor/ColorSelector"
import iconTextColor from "../../../../../../assets/text_ui/colorPicker.png"
import ButtonStandard from "../../../../../global/Buttons/ButtonStandard"

function WidgetProperties({
  viewEditProperties,
  selectedColor,
  selectedFont,
  selectedSize,
  selectedAlignment,
  setSelectedFont,
  setSelectedSize,
  setSelectedColor,
  setAlignment,
}) {
  const [displayCPicker, setDisplayCPicker] = useState(false)

  const handleColorPicker = () => {
    setDisplayCPicker(true)
  }

  const handleCloseColorPicker = (color) => {
    setDisplayCPicker(false)
    setSelectedColor(color)
  }

  /* JSX */
  return (
    <div>
      <div className="title-properties">
        <span>Text</span>
      </div>
      {/* {viewEditProperties && ( */}
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
      {/* )} */}
    </div>
  )
}

export default WidgetProperties
