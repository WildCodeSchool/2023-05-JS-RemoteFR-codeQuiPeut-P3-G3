/* Packages */
import { useState, useEffect } from "react"
import { useEditionContext } from "../../../services/contexts/editionContext"

/* Style */
import "./style/widgetSettings.scss"

/* Components */
import TextProperties from "../../global/texts-editor/textProperties"
import FontSelector from "../../global/DropLists/FontSelector"
import ColorSelector from "../../global/texts-editor/ColorSelector"
import ButtonStandard from "../../global/Buttons/ButtonStandard"
import imgArrowTop from "../../../assets/text_ui/arrow_top.png"
import imgArrowBottom from "../../../assets/text_ui/arrow_bottom.png"

/* Images */
import iconTextColor from "../../../assets/text_ui/colorPicker.png"

function WidgetTexts({ viewEditProperties }) {
  const [displayCPicker, setDisplayCPicker] = useState(false)
  const [extend, setExtend] = useState(true)

  /* FROM CONTEXT */

  // const { updated, setUpdated } = useEditionContext()
  const { selectedColor, selectedFont, selectedSize, selectedAlignment } =
    useEditionContext()
  const { setSelectedColor, setSelectedFont, setAlignment } =
    useEditionContext()

  const { canvas } = useEditionContext()

  /* =============== */

  const handleColorPicker = () => {
    setDisplayCPicker(!displayCPicker)
  }

  const handleCloseColorPicker = (color) => {
    setDisplayCPicker(false)
    setSelectedColor(color)
  }

  /* Update states => context */
  useEffect(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject()
      if (activeObject) {
        const updatedProperties = {
          textAlign: selectedAlignment,
          fill: selectedColor,
          fontSize: selectedSize,
          fontFamily: selectedFont,
        }
        activeObject.set(updatedProperties)
        canvas.renderAll()
      }
    }
  }, [selectedColor, selectedFont, selectedAlignment])

  /* JSX */
  return (
    <div className="wrap-widget">
      <div className="title-properties" onClick={() => setExtend(!extend)}>
        <span>Font style</span>
        {extend ? (
          <img src={imgArrowTop} alt="img-reduce" />
        ) : (
          <img src={imgArrowBottom} alt="img-extend" />
        )}
      </div>
      {viewEditProperties && (
        <div className={`objectProps ${extend ? "extended" : "hidden"}`}>
          <div className="objectProps__section">
            <h6> Font family </h6>
            <div className="objectProps__section__props">
              <FontSelector
                setSelectedFont={setSelectedFont}
                selectedFont={selectedFont}
              />

              <ButtonStandard img={iconTextColor} onClick={handleColorPicker} />

              <div
                className="previewColor"
                style={{ backgroundColor: selectedColor }}
              ></div>

              {displayCPicker && (
                <ColorSelector
                  state={displayCPicker}
                  onClose={handleCloseColorPicker}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              )}
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
      )}
    </div>
  )
}

export default WidgetTexts
