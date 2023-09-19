import React, { useState } from "react"
import "./widgetText.scss"
import FontSelector from "../../../../../global/DropLists/FontSelector"
import FontSize from "../../../../../global/DropLists/FontSize"
import ColorSelector from "../../../../../global/texts-editor/ColorSelector"
import iconTextColor from "../../../../../../assets/text_ui/colorPicker.png"
import ButtonStandard from "../../../../../global/Buttons/ButtonStandard"
import "./WidgetText.scss"

function widgetText({
  selectedColor,
  selectedFont,
  selectedSize,
  setSelectedFont,
  setSelectedSize,
  setSelectedColor,
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
      <div className="widgeTitle">
        <span>Text Formatting</span>
      </div>
      <div className="fontContent">
        <span className="formattingText">
          TITLE: Font family, size and color<br></br>
          TEXT: Font family and color<br></br>
          BUTTON: Font family
        </span>
        <div className="fontSelection">
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
      </div>
    </div>
  )
}

export default widgetText
