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

function WidgetTexts({
  viewEditProperties,
  // setObjectSelected,
  // objectSelected,
}) {
  const [displayCPicker, setDisplayCPicker] = useState(false)
  const [extend, setExtend] = useState(true)

  /* FROM CONTEXT */

  // const { updated, setUpdated } = useEditionContext()
  const { selectedColor, selectedFont, selectedSize, selectedAlignment } =
    useEditionContext()
  const { setSelectedColor, setSelectedFont, setAlignment } =
    useEditionContext()

  const { tabObject, objectSelected } = useEditionContext()

  /* =============== */

  const handleColorPicker = () => {
    setDisplayCPicker(true)
  }

  const handleCloseColorPicker = (color) => {
    setDisplayCPicker(false)
    setSelectedColor(color)
  }

  useEffect(() => {
    if (objectSelected) {
      const updateDataTexts = {
        ...objectSelected.properties,
        fontSize: selectedSize,
        fill: selectedColor,
        textAlign: selectedAlignment,
        fontFamily: selectedFont,
      }
      tabObject.saveProperties(updateDataTexts)
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
              >
                <ColorSelector
                  state={displayCPicker}
                  onClose={handleCloseColorPicker}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              </div>
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
