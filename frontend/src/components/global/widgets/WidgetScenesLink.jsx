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
import { useLocation } from "react-router-dom"

function WidgetScenesLink() {
  const [linkView, setLinkView] = useState(false)
  const [extend, setExtend] = useState(true)
  const [data, setData] = useState({})
  const [selectedLink, setSelectedLink] = useState(null)

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const story = params.get("story")
  const scene = params.get("scene")

  const {
    objectSelected,
    updateActions,
    setUpdateActions,
    tabElem,
    getActions,
    editStatus,
    editSettings,
    canvas,
  } = useEditionContext()

  /* Update visue actions */
  useEffect(() => {
    if (updateActions) {
      setUpdateActions(false)

      getActions()
    }
  }, [updateActions])

  useEffect(() => {
    editSettings(story, scene)
  }, [story, scene])

  useEffect(() => {
    if (objectSelected.selected) {
      setExtend(true)
    } else {
      setExtend(false)
    }
  }, [objectSelected.selected])

  useEffect(() => {
    if (editStatus.nbreScene > 0) {
      const items = []

      for (let i = 0; i < editStatus.nbreScene; i++) {
        items.push({ value: i.toString(), label: `scene ${i}` })
      }

      // Update the data state with the new items
      setData(items)
    }
  }, [editStatus.nbreScene])

  /* Sauvegarde link scene */
  useEffect(() => {
    if (selectedLink !== null) {
      if (canvas) {
        const activeObject = canvas.getActiveObject()

        if (activeObject) {
          activeObject.set({ Link: selectedLink })
          canvas.renderAll()
        }
      }
    }
  }, [selectedLink])

  useEffect(() => {
    if (!linkView) {
      setSelectedLink("")
    }
  }, [linkView])

  useEffect(() => {
    if (objectSelected.link !== null) {
      setSelectedLink(objectSelected.link)
      setLinkView(true)
    }
  }, [objectSelected])

  return (
    <div className="wrap-widget">
      <div className="title-properties" onClick={() => setExtend(!extend)}>
        <span>Actions</span>
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
                  <WidgetButtons
                    styles={stylesDLAdminActions}
                    data={data}
                    selected={selectedLink}
                    setter={setSelectedLink}
                  />
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
