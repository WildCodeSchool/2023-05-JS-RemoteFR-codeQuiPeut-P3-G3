/* Packages */
import { useState, useEffect } from "react"
import { useEditionContext } from "../../../services/contexts/editionContext"

/* Style */
import "./style/widgetSettings.scss"

/* Components */
import ButtonStandard from "../Buttons/ButtonStandard"
import ColorSelector from "../texts-editor/ColorSelector"

/* Images */
import iconTextColor from "../../../assets/text_ui/colorPicker.png"
import iconStroke from "../../../assets/text_ui/stroke.png"
import iconBorder from "../../../assets/text_ui/radius.png"
import imgArrowTop from "../../../assets/text_ui/arrow_top.png"
import imgArrowBottom from "../../../assets/text_ui/arrow_bottom.png"

function WidgetRect({ viewEditProperties, objectSelected, setObjectSelected }) {
  const [displayCPickerBg, setDisplayCPickerBg] = useState(false)
  const [displayCPickerBorder, setDisplayCPickerBorder] = useState(false)
  const [extend, setExtend] = useState(false)

  /* FROM CONTEXT */

  const {
    selectedSizeBorder,
    selectedSizeRadius,
    selectedColorBorder,
    selectedColorBg,
  } = useEditionContext()
  const {
    setSelectedSizeBorder,
    setSelectedSizeRadius,
    setSelectedColorBorder,
    setSelectedColorBg,
  } = useEditionContext

  const { updated, setUpdated } = useEditionContext()

  /* =============== */

  /* Update states => context */
  useEffect(() => {
    const updateDataTexts = {
      ...objectSelected.properties,
      strokeWidth: selectedSizeBorder,
      rx: selectedSizeRadius,
      ry: selectedSizeRadius,
      stroke: selectedColorBorder,
      fill: selectedColorBg,
    }

    console.log("update context <= states : ", updateDataTexts)

    setObjectSelected((prev) => ({
      ...prev,
      properties: updateDataTexts,
    }))
  }, [
    selectedSizeBorder,
    selectedSizeRadius,
    selectedColorBorder,
    selectedColorBg,
  ])

  // const [sceneLink, setSceneLink] = useState(false)

  /* Background color select */
  const handleColorPickerBg = () => {
    setDisplayCPickerBg(true)
  }

  const handleCloseColorPickerBg = (color) => {
    setDisplayCPickerBg(false)
    setSelectedColorBg(color)
  }

  /* Border color select */
  const handleColorPickerBorder = () => {
    setDisplayCPickerBorder(true)
  }

  const handleCloseColorPickerBorder = (color) => {
    setDisplayCPickerBorder(false)
    setSelectedColorBorder(color)
  }

  return (
    <div className="wrap-widget">
      <div className="title-properties" onClick={() => setExtend(!extend)}>
        <span>Properties</span>
        {extend ? (
          <img src={imgArrowTop} alt="img-reduce" />
        ) : (
          <img src={imgArrowBottom} alt="img-extend" />
        )}
      </div>
      {/* {viewEditRect && ( */}
      <div className={`objectProps ${extend ? "extended" : "hidden"}`}>
        <div className="objectProps__section">
          <h6> Background </h6>
          <div className="objectProps__section__props">
            <span> Fill </span>
            <div className="sets">
              <ButtonStandard
                img={iconTextColor}
                onClick={handleColorPickerBg}
              />
              <ColorSelector
                state={displayCPickerBg}
                onClose={handleCloseColorPickerBg}
                selectedColor={selectedColorBg}
                setSelectedColor={setSelectedColorBg}
              />

              <div
                className="previewColor"
                style={{ backgroundColor: selectedColorBg }}
              ></div>
            </div>
          </div>
        </div>
        <div className="objectProps__section">
          <h6> Border </h6>
          <div className="objectProps__section__props">
            <span> size </span>

            <div className="sets">
              <ButtonStandard img={iconStroke} />
              <input
                type="text"
                placeholder="10"
                onChange={(e) =>
                  setSelectedSizeBorder(parseInt(e.target.value))
                }
                value={selectedSizeBorder}
              ></input>
              <span>px</span>
            </div>
          </div>

          <div className="objectProps__section__props">
            <span> radius </span>

            <div className="sets">
              <ButtonStandard img={iconBorder} />
              <input
                type="text"
                placeholder="10"
                onChange={(e) => setSelectedSizeRadius(e.target.value)}
                value={selectedSizeRadius}
              ></input>
              <span>px</span>
            </div>
          </div>

          <div className="objectProps__section__props">
            <span> color </span>

            <div className="sets">
              <ButtonStandard
                img={iconTextColor}
                onClick={handleColorPickerBorder}
              />

              <div
                className="previewColor"
                style={{ backgroundColor: selectedColorBorder }}
              ></div>

              <ColorSelector
                state={displayCPickerBorder}
                onClose={handleCloseColorPickerBorder}
                selectedColor={selectedColorBorder}
                setSelectedColor={setSelectedColorBorder}
              />
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  )
}

export default WidgetRect
