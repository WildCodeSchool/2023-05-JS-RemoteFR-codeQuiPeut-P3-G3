/* eslint-disable no-restricted-syntax */
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

  const { tabObject, canvas } = useEditionContext()

  /* =============== */

  const handleColorPicker = () => {
    setDisplayCPicker(true)
  }

  const handleCloseColorPicker = (color) => {
    setDisplayCPicker(false)
    setSelectedColor(color)
  }

  /* Update states => context */
  useEffect(() => {
    // const { id, type } = objectSelected

    // console.log("id : ", id, "type : ", type)

    // if (type === "textbox") {
    //   const updateDataTexts = { ...objects[type][id] }
    //   console.log("widgetText - objectSelected start : ", updateDataTexts)

    // Modifiez les propriétés spécifiques de updateDataTexts
    // updateDataTexts.fontSize = selectedSize
    // updateDataTexts.fill = selectedColor
    // updateDataTexts.textAlign = selectedAlignment
    // updateDataTexts.fontFamily = selectedFont

    // console.log("widgetText - params à modifier : ", updateDataTexts)
    if (canvas) {
      const activeObject = canvas.getActiveObject()
      if (activeObject) {
        const { item } = tabObject.getItemById(activeObject)
        console.log("object to update.... ", item)
        const updatedProperties = {
          textAlign: selectedAlignment,
          fill: selectedColor,
          fontSize: selectedSize,
          fontFamily: selectedFont,
        }

        if (item) {
          activeObject.set(updatedProperties)
          canvas.renderAll()
        }
      }
    }

    // tabObject.saveProperties(updateDataTexts)

    // }
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
