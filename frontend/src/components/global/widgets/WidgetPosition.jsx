/* Packages */
import { useState } from "react"

/* Style */
import "./style/widgetSettings.scss"

/* Components */
import ButtonRound from "../Buttons/ButtonRound"

/* Images */
import imgSendToBack from "../../../assets/text_ui/send_to_back.png"
import imgBringToFront from "../../../assets/text_ui/bring_to_front.png"
import imgArrowTop from "../../../assets/text_ui/arrow_top.png"
import imgArrowBottom from "../../../assets/text_ui/arrow_bottom.png"

function WidgetPosition({ viewSceneLink }) {
  const [extend, setExtend] = useState(false)
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
      <div className={`objectProps ${extend ? "extended" : "hidden"}`}>
        <div className="objectProps__section">
          <div className="objectProps__section__props">
            <span> Position </span>
            <ButtonRound img={imgSendToBack} />
            <ButtonRound img={imgBringToFront} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WidgetPosition
