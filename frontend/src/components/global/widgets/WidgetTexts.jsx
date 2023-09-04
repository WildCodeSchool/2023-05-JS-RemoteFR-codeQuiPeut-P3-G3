/* Packages */
import { useState } from "react"

/* Style */
import "./style/widgetSettings.scss"

/* Components */
import TextProperties from "../../global/texts-editor/textProperties"
import FontSelector from "../../global/DropLists/FontSelector"
import FontSize from "../../global/DropLists/FontSize"
import ColorSelector from "../../global/texts-editor/ColorSelector"
import ButtonStandard from "../../global/Buttons/ButtonStandard"
import imgArrowTop from "../../../assets/text_ui/arrow_top.png"
import imgArrowBottom from "../../../assets/text_ui/arrow_bottom.png"

/* Images */
import iconTextColor from "../../../assets/text_ui/colorPicker.png"

function WidgetTexts({
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
  const [extend, setExtend] = useState(true)

  const handleColorPicker = () => {
    setDisplayCPicker(true)
  }

  const handleCloseColorPicker = (color) => {
    setDisplayCPicker(false)
    setSelectedColor(color)
  }

  /* JSX */
  return (
    <div className="wrap-widget">
      <div className="title-properties" onClick={() => setExtend(!extend)}>
        <span>Text</span>
        {extend ? (
          <img src={imgArrowTop} alt="img-reduce" />
        ) : (
          <img src={imgArrowBottom} alt="img-extend" />
        )}
      </div>
      {/* {viewEditProperties && ( */}
      <div className={`objectProps ${extend ? "extended" : "hidden"}`}>
        <div className="objectProps__section">
          <h6> Font family </h6>
          <div className="objectProps__section__props">
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
        <div className="objectProps__section">
          <h6> Alignment </h6>
          <TextProperties
            selectedAlignment={selectedAlignment}
            setAlignment={setAlignment}
          />
        </div>
      </div>
      {/* )} */}
    </div>
  )
}

export default WidgetTexts
