/* Packages */
import { useEffect, useState } from "react"

/* Style */
import "./style/widgetSettings.scss"

/* Components */
import ButtonRound from "../Buttons/ButtonRound"

/* Images */
import imgSendToBack from "../../../assets/text_ui/send_to_back.png"
import imgBringToFront from "../../../assets/text_ui/bring_to_front.png"
import imgArrowTop from "../../../assets/text_ui/arrow_top.png"
import imgArrowBottom from "../../../assets/text_ui/arrow_bottom.png"
import imgFlipVert from "../../../assets/text_ui/flipVert.png"
import imgFlipHoriz from "../../../assets/text_ui/flipHoriz.png"

import { useEditionContext } from "../../../services/contexts/editionContext"

function WidgetPosition({ viewSceneLink }) {
  const [extend, setExtend] = useState(true)

  const { objectSelected, canvas } = useEditionContext()
  // const { setFlipHoriz, setFlipVert, setFront, setBehind } = useEditionContext()

  useEffect(() => {
    if (objectSelected && objectSelected.type !== "") {
      setExtend(true)
    } else {
      setExtend(false)
    }
  }, [objectSelected])

  const handleFlipVert = () => {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      activeObject.set({ flipX: !activeObject.flipX })
      canvas.renderAll()
    }
  }

  const handleFlipHoriz = () => {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      activeObject.set({ flipY: !activeObject.flipY })
      canvas.renderAll()
    }
  }

  const handleBringToFront = () => {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      canvas.moveTo(activeObject, 1)
      canvas.renderAll()
    }
  }

  const handleSendToBack = () => {
    const activeObject = canvas.getActiveObject()
    if (activeObject) {
      canvas.moveTo(activeObject, 0)
      canvas.renderAll()
    }
  }

  return (
    <div className="wrap-widget">
      <div className="title-properties" onClick={() => setExtend(!extend)}>
        <span>Position</span>
        {extend ? (
          <img src={imgArrowTop} alt="img-reduce" />
        ) : (
          <img src={imgArrowBottom} alt="img-extend" />
        )}
      </div>
      {/* {viewSceneLink && ( */}
      {objectSelected.type !== "" && (
        <div className={`objectProps ${extend ? "extended" : "hidden"}`}>
          <div className="objectProps__section">
            <div className="objectProps__section__props">
              <ButtonRound img={imgFlipVert} onClick={handleFlipVert} />
              <ButtonRound img={imgFlipHoriz} onClick={handleFlipHoriz} />
              <ButtonRound img={imgSendToBack} onClick={handleSendToBack} />
              <ButtonRound img={imgBringToFront} onClick={handleBringToFront} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WidgetPosition
