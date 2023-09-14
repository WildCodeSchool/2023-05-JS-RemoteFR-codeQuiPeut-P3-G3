/* Packages */
import { useState } from "react"

/* Style */
import "./style/widgetSettings.scss"

/* Components */
import WidgetButtons from "./WidgetButtons"

/* Images */
import imgSwitchOff from "../../../assets/user_ui/switch_off.png"
import imgSwitchOn from "../../../assets/user_ui/switch_on.png"
import imgArrowTop from "../../../assets/text_ui/arrow_top.png"
import imgArrowBottom from "../../../assets/text_ui/arrow_bottom.png"
import imgPlus from "../../../assets/text_ui/plus.png"
import ActionType from "./ActionsType"
import { useEditionContext } from "../../../services/contexts/editionContext"

function WidgetScenesLink({
  viewEditRect,
  setSelectedColorBg,
  setSelectedColorBorder,
  selectedColorBg,
  selectedColorBorder,
}) {
  const [sceneLink, setSceneLink] = useState(false)
  const [extend, setExtend] = useState(false)

  const { ObjectSelected } = useEditionContext()

  return (
    <div className="wrap-widget">
      <div className="title-properties" onClick={() => setExtend(!extend)}>
        <span>Scenes link</span>
        {extend ? (
          <img src={imgArrowTop} alt="img-reduce" />
        ) : (
          <img src={imgArrowBottom} alt="img-extend" />
        )}
      </div>
      {/* {viewEditRect && ( */}
      <div className={`objectProps ${extend ? "extended" : "hidden"}`}>
        <div className="objectProps__section">
          <h6> Scene Link </h6>
          <div className="objectProps__section__props">
            <span> activate </span>
            <button
              type="button"
              className="btn-switchLinkScene"
              alt="icon-switch"
              onClick={() => setSceneLink(!sceneLink)}
            >
              <img
                src={sceneLink ? imgSwitchOn : imgSwitchOff}
                alt="icon-switch"
              />
            </button>
          </div>
          {sceneLink && (
            <>
              <div className="objectProps__section__props">
                <span className="item"> Scene to link </span>

                <div className="sets">
                  <WidgetButtons />
                </div>
              </div>
            </>
          )}
          <h6> Actions </h6>

          <div className="objectProps__section__props">
            <span className="item"> activate </span>
            <button
              type="button"
              className="btn-switchLinkScene"
              alt="icon-switch"
              onClick={() => setSceneLink(!sceneLink)}
            >
              <img
                src={sceneLink ? imgSwitchOn : imgSwitchOff}
                alt="icon-switch"
              />
            </button>
          </div>

          <div className="listActions">
            {ObjectSelected &&
            ObjectSelected.properties &&
            ObjectSelected.properties.Actions ? (
              ObjectSelected.properties.Actions.map((elem) => {
                return <p>{elem}</p>
              })
            ) : (
              <p>Aucune action définie</p>
            )}
          </div>
          {sceneLink && (
            <>
              <div className="objectProps__section__props">
                <div className="sets">
                  <ActionType />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* )} */}
    </div>
  )
}

export default WidgetScenesLink
