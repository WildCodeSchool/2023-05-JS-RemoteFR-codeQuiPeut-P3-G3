/* Packages */
import { useState, useEffect } from "react"

/* Style */
import "./style/widgetSettings.scss"

/* Components */
import WidgetButtons from "./WidgetButtons"

/* Images */
import imgSwitchOff from "../../../assets/user_ui/switch_off.png"
import imgSwitchOn from "../../../assets/user_ui/switch_on.png"
import imgArrowTop from "../../../assets/text_ui/arrow_top.png"
import imgArrowBottom from "../../../assets/text_ui/arrow_bottom.png"
import ActionType from "./ActionsType"

import { useEditionContext } from "../../../services/contexts/editionContext"
import { stylesDLAdminActions } from "../DropLists/stylesDropList"

function WidgetScenesLink() {
  const [linkView, setLinkView] = useState(false)
  const [extend, setExtend] = useState(true)

  const {
    objectSelected,
    updateActions,
    setUpdateActions,
    tabElem,
    getActions,
  } = useEditionContext()

  /* Update visue actions */
  useEffect(() => {
    if (updateActions) {
      setUpdateActions(false)

      getActions()
    }
  }, [updateActions])

  useEffect(() => {
    if (objectSelected.selected) {
      setExtend(true)
    } else {
      setExtend(false)
    }
  }, [objectSelected.selected])

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

      <div className={`objectProps ${extend ? "extended links" : "hidden"}`}>
        <div className="objectProps__section">
          <h6> Scene Link </h6>
          <div className="objectProps__section__props">
            <span> activate </span>
            <button
              type="button"
              className="btn-switchLinkScene"
              alt="icon-switch"
              onClick={() => setLinkView(!linkView)}
            >
              <img
                src={linkView ? imgSwitchOn : imgSwitchOff}
                alt="icon-switch"
              />
            </button>
          </div>
          {linkView && (
            <>
              <div className="objectProps__section__props">
                <span className="item"> Scene to link </span>

                <div className="sets">
                  <WidgetButtons styles={stylesDLAdminActions} />
                </div>
              </div>
            </>
          )}
          <h6> Actions </h6>
        </div>

        <>
          <div className="objectProps__section__props">
            {tabElem.length > 0 ? (
              <div className="listActions">
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Target</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>{tabElem}</tbody>
                </table>
              </div>
            ) : (
              <div className="objectProps__section__props">
                <span>
                  <strong>No actions currently.</strong>
                </span>
              </div>
            )}
          </div>
          <div className="objectProps__section__props">
            <div className="separator"></div>
          </div>

          <div className="objectProps__section__props">
            <ActionType />
          </div>
        </>
      </div>
    </div>
  )
}

export default WidgetScenesLink
